import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { attachmentId: string; courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const CourseOwner = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!CourseOwner) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const AttachemntDelete = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });
    return NextResponse.json(AttachemntDelete);
  } catch (error) {
    return new NextResponse("interal Error from Delete Attachment", {
      status: 500,
    });
  }
}
