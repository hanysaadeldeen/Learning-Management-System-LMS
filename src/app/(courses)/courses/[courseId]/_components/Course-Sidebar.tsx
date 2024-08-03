import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseSidebarItems from "./Course-sidebar-Items";
import Link from "next/link";
import Logo from "@/app/(dashboard)/_components/(sidebar)/logo";

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
  // const purhase = await db.purchase.findUnique({
  //   where: {
  //     userId_courseId: {
  //       userId,
  //       courseId: course.id,
  //     },
  //   },
  // });

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
      <div className="p-6 border-b mb-5">
        <h1 className="text-center font-bold text-lg  text-slate-700 capitalize">
          {course.title}
        </h1>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
