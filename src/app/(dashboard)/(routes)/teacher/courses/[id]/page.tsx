import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { LayoutDashboard } from "lucide-react";
import Titleform from "./_components/Title-form";
import DescriptionForm from "./_components/Description-form";
import ImageUploadForm from "./_components/Image-Upload";
import CateogryForm from "./_components/Category-form";
import { Label } from "@radix-ui/react-label";

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
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
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
      <DescriptionForm initialData={course} courseId={course.id} />
      <ImageUploadForm initialData={course} courseId={course.id} />
      <CateogryForm
        initialData={course}
        courseId={course.id}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
    </section>
  );
};

export default CourseIdPage;
