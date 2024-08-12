import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseSidebarItems from "./Course-sidebar-Items";
import Link from "next/link";
import Logo from "@/app/(dashboard)/_components/(sidebar)/logo";
import { redirect } from "next/navigation";
import CourseProgress from "@/components/Course-Progress";

type CourseSidebarType = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  ProgressCount: number;
};
const CourseSidebar = async ({ course, ProgressCount }: CourseSidebarType) => {
  const { userId } = auth();

  if (!userId) redirect("/");
  const purhase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  console.log(purhase);

  return (
    <div className="border-r h-full overflow-y-auto overflow-x-hidden">
      <>
        <Link href="/">
          <div className="max-md:p-2 pt-4 px-4 flex justify-center items-center gap-4">
            <Logo />
            <p className="font-bold text-xl text-[#E3073C]  tracking-wider">
              LMS
            </p>
          </div>
        </Link>
      </>
      <div className="p-6 border-b ">
        <Link href={`/courses/${course.id}`}>
          <h1 className="text-center font-bold text-lg  text-slate-700 capitalize">
            {course.title}
          </h1>
        </Link>
        <div className="w-full h-1 bg-gray-300 my-5"></div>
        {purhase && <CourseProgress progress={ProgressCount} />}
      </div>
      <div className="w-full flex  flex-col">
        {course.chapter.map((chapter) => {
          return (
            <CourseSidebarItems
              key={chapter.id}
              id={chapter.id}
              title={chapter.chapterTitle}
              courseId={chapter.courseId}
              isLocked={!chapter.ifFree}
              isComplete={!!chapter.userProgress?.[0]?.isCompleted}
              purhase={purhase!}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
