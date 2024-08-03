import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const CourseOwner = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!CourseOwner) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const NewPosition = lastChapter ? lastChapter.position + 1 : 1;

    const CreateChpater = await db.chapter.create({
      data: {
        chapterTitle: title,
        courseId: params.courseId,
        position: NewPosition,
      },
    });
    return NextResponse.json(CreateChpater);
  } catch (error) {
    return new NextResponse("internal Server Error in Chapter", {
      status: 500,
    });
  }
}
