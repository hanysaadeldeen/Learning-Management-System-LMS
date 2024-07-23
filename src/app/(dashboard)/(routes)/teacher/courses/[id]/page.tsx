import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import {
  BadgeDollarSign,
  LayoutDashboard,
  ListTodo,
  Sliders,
} from "lucide-react";
import Logo from "@/app/(dashboard)/_components/(sidebar)/logo";
import Titleform from "./_components/Title-form";
const CourseIdPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!userId || !course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imgUrl,
    course.price,
    course.CategoryId,
  ];

  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;
  const uncopltetdFileds = `(${completedFileds} / ${totalFileds})`;

  return (
    <section className="p-10">
      <h1 className="text-2xl font-semibold  mb-2 "> Course Setup</h1>
      <p className="mb-16 tracking-wide">
        Complete All Fields {uncopltetdFileds}
      </p>
      <div className="flex gap-2 items-center">
        <div className="p-2  bg-sky-200 w-fit  rounded-full">
          <LayoutDashboard className=" text-sky-700 " />
        </div>
        <h2 className="text-2xl"> Customize Your Course</h2>
      </div>
      <Titleform initialData={course} courseId={course.id} />
    </section>
  );
};

export default CourseIdPage;
