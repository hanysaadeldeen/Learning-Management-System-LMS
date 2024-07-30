import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const value = await req.json();
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
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });

    const hasPublishedChapter = course?.chapter.some(
      (shapter) => shapter.isPublished
    );
    if (value.isPublished) {
      if (!hasPublishedChapter) {
        return new NextResponse("Missing reqired fields", { status: 400 });
      }
    }

    if (!course || !course.title || !course.description || !course.imgUrl) {
      return new NextResponse("Missing reqired fields", { status: 400 });
    }

    const updatedChapterrr = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        ...value,
      },
    });
    return NextResponse.json(updatedChapterrr);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
