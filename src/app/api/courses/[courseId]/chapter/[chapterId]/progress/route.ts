import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    // const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const requestValue = await req.json();

    // const userProgress = await db.userProgress.upsert({
    //   where: {
    //     chapterId_userId: {
    //       userId,
    //       chapterId: params.chapterId,
    //     },
    //   },
    //   update: {
    //     isCompleted,
    //   },
    //   create: {
    //     userId,
    //     chapterId: params.chapterId,
    //     isCompleted,
    //   },
    // });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isCompleted: requestValue.isCompleted,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    return new NextResponse("some Thing Wrong in Change Status of Chapter", {
      status: 500,
    });
  }
}
