import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import Mux from "@mux/mux-node";

// const { video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!,
// );

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
