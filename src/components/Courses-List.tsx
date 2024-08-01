import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./Course-Card";

type CourseProgressCategoryAndTitle = Course & {
  categoryId: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseProgressCategoryAndTitle[];
}

const CoursesList = ({ items }: CourseListProps) => {
  console.log(items);

  return (
    <div>
      <h1>All Courses</h1>
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-4 grid-cols-1">
        {items &&
          items.map((item) => {
            <CourseCard key={item.id} data={...item} />;
          })}
      </div>
      {items === undefined && (
        <h1 className="text-center text-slate-500 mt-10">No Courses Found</h1>
      )}
    </div>
  );
};

export default CoursesList;
