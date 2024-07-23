// API Route (api/courses/page.ts OR api/courses/route.ts)
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod"; // Import for validation (optional)

const courseSchema = z.object({
  title: z.string().trim().min(1, "Title is required"), // Example validation rule
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Optional server-side validation using zod
    const validatedData = courseSchema.safeParse({ title });
    if (!validatedData.success) {
      return new NextResponse(JSON.stringify(validatedData.error), {
        status: 400,
      });
    }

    const course = await db.course.create({
      data: { title, userId },
    });
    return NextResponse.json(course);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
