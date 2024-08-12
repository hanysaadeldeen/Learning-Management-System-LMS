import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return redirect("/");
    }
    const requestValue = await req.json();
    // const course = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId,
    //   },
    // });
    // if (!course) {
    //   return new NextResponse("Unauthorized at course ID", { status: 401 });
    // }
    // const chackpurchase = await db.purchase.findUnique({
    //   where: {
    //     id: params.courseId,
    //   },
    // });
    // if (!chackpurchase) {
    //   return new NextResponse("Unauthorized at Purchase ID", { status: 401 });
    // }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isCompleted: requestValue.check,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    return new NextResponse("some Thing Wrong in Change Status of Chapter", {
      status: 500,
    });
  }
}
