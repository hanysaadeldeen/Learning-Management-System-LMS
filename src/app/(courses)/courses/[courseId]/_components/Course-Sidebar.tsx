import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseSidebarItems from "./Course-sidebar-Items";

type CourseSidebarType = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
};
const CourseSidebar = async ({ course, progress }: CourseSidebarType) => {
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
