import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import Mux from "@mux/mux-node";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const CourseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!CourseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // we should get chapter before we delete it
    const chapter = await db.chapter.findUnique({
      where: {
        courseId: params.courseId,
        id: params.chapterId,
      },
    });
    if (!chapter) {
      return new NextResponse("Chapter Not Found", { status: 404 });
    }

    // delete video from mux website
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetsId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    // delete chapter
    const DeleteChapter = await db.chapter.delete({
      where: {
        courseId: params.courseId,
        id: params.chapterId,
      },
    });

    // check if it is the last chapter then make change the pupblich status to private =>false
    const pupblishChapterinCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });
    if (!pupblishChapterinCourse) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(DeleteChapter);
  } catch (error) {
    return new NextResponse("someThing went wrong!", { status: 500 });
  }
}

const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
const { video } = muxClient;

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { isPublished, ...values } = await req.json();
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const ChapterEdit = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      // find Mux Data for Chapter
      const existingVideo = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      // for Delete existing video if it is there
      if (existingVideo) {
        await video.assets.delete(existingVideo.assetsId);
        await db.muxData.delete({
          where: {
            id: existingVideo.id,
          },
        });
      }

      // For Create a new video  with Mux
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        encoding_tier: "baseline",
        test: false,
      });

      // save video to your Database
      await db.muxData.create({
        data: {
          assetsId: asset.id,
          chapterId: params.chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(ChapterEdit);
  } catch (error) {
    return new NextResponse("someThing went wrong", { status: 500 });
  }
}
