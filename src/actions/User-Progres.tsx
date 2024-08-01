import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GetProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const response = await db.userProgress.findUnique({
      where: {
        userId,
        id: courseId,
      },
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
