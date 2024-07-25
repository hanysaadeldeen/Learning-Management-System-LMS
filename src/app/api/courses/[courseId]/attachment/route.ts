import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { url } = await req.json();
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
      return new NextResponse("unauthorized", { status: 401 });
    }

    const Attachemnt = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });
    return NextResponse.json(Attachemnt);
  } catch (err) {
    return new NextResponse("Internal Server Error At Attachment", {
      status: 500,
    });
  }
};
