import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) {
      return new NextResponse("Chapter Not Found", { status: 404 });
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(updatedChapter);
  } catch (error) {
    return new NextResponse("someThing went wrong!", { status: 500 });
  }
}
