import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./Course-Card";
import { GetCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// type CourseProgressCategoryAndTitle = Course & {
//   categoryId: Category | null;
//   chapter: { id: string }[];
//   progress: number | null;
// };

// interface CourseListProps {
//   data: CourseProgressCategoryAndTitle[];
// }

interface searchParams {
  searchParams: {
    title: string;
    category: string;
  };
}

const CoursesList = async ({ searchParams }: searchParams) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const AllCourses = await GetCourse({
    userId,
    ...searchParams,
  });
  return (
    <div>
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4  gap-4 grid-cols-1">
        {AllCourses.map((item) => {
          return (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imgUrl={item.imgUrl!}
              chapterLength={item.chapter.length}
              price={item.price!}
              category={item.category?.name!}
            />
          );
        })}
      </div>
      {AllCourses && AllCourses.length === 0 && (
        <h1 className="text-center text-slate-500 mt-10">No Courses Found</h1>
      )}
    </div>
  );
};

export default CoursesList;
