import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
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

  // const updateChapter = await db.chapter.update({
  //   where: {
  //     id: params.chapterId,
  //     chapterId: params.chapterId,
  //   },
  // });

  try {
  } catch (error) {
    return new NextResponse("someThing went wrong", { status: 500 });
  }
}
