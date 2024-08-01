import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./Course-Card";

type CourseProgressCategoryAndTitle = Course & {
  categoryId: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  data: CourseProgressCategoryAndTitle[];
}

const CoursesList = ({ data }: CourseListProps) => {
  return (
    <div>
      <h1 className="px-2  my-4 text-xl font-bold text-slate-600 tracking-wide">
        All Courses
      </h1>
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4  gap-4 grid-cols-1">
        {data.map((item) => {
          console.log(item.chapter);
          return (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imgUrl={item.imgUrl!}
              chapterLength={item.chapter.length}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name!}
            />
          );
        })}
      </div>
      {data && data.length === 0 && (
        <h1 className="text-center text-slate-500 mt-10">No Courses Found</h1>
      )}
    </div>
  );
};

export default CoursesList;
