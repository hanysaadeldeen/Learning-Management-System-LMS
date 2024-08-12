import { GetProgress } from "@/actions/User-Progres";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/Course-Sidebar";
import CourseNavBar from "./_components/Course-NavBar";
import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

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
    <div className="h-full ">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <div className="navbar md:pl-72 h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
        <CourseNavBar course={course} ProgressCount={ProgressCount} />
      </div>
      <div className="hidden md:block w-72 h-full fixed z-50">
        <CourseSidebar course={course} ProgressCount={ProgressCount} />
      </div>
      <main className="md:pl-72 md:pt-[80px] h-full">{children}</main>
      <Toaster position="top-right" reverseOrder={false} />
      <ConfettiProvider />
    </div>
  );
}
