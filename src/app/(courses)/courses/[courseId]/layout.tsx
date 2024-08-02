import { GetProgress } from "@/actions/User-Progres";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "learning management system",
};

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string };
}>) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }

  const ProgressCount = await GetProgress(userId, course.id);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
