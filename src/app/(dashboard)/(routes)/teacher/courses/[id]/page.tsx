import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import Titleform from "./_components/Title-form";
import DescriptionForm from "./_components/Description-form";
import ImageUploadForm from "./_components/Image-Upload";
import CateogryForm from "./_components/Category-form";
import PriceFrom from "./_components/Price-form";
import AttachmentForm from "./_components/Attachment-form";

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
    include: {
      attachment: {
        orderBy: {
          created_at: "desc",
        },
      },
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
    course.categoryId,
  ];

  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;
  const uncopltetdFileds = `(${completedFileds} / ${totalFileds})`;

  return (
    <section className="p-10  ">
      <h1 className="text-2xl font-semibold  mb-2 "> Course Setup</h1>
      <p className="mb-16 tracking-wide">
        Complete All Fields {uncopltetdFileds}
      </p>
      <div className="max-lg:flex-col gap-10 flex  w-full">
        <div className="max-lg:w-full w-1/2">
          <div className="flex gap-2 items-center">
            <div className="w-11 h-10  bg-sky-200 flex justify-center items-center  rounded-full">
              <LayoutDashboard className=" text-sky-700 " />
            </div>
            <h2 className="text-xl"> Customize Your Course</h2>
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
        </div>
        <div className="max-lg:w-full w-1/2">
          <div className="flex gap-2 mb-6 items-center">
            <div className="w-10 h-10  bg-sky-200 flex justify-center items-center  rounded-full">
              <ListCheck className=" text-sky-700  ml-1" />
            </div>
            <h2 className="text-xl">Course Chapter</h2>
          </div>
          <div className="flex gap-2 items-center">
            <div className=" bg-sky-200 flex justify-center items-center w-fit p-2 rounded-full">
              <CircleDollarSign className="text-sky-700 w-5 h-5" />
            </div>
            <h4 className="text-xl">Set Your Price</h4>
          </div>
          <PriceFrom initialData={course} courseId={course.id} />
          <div className="flex gap-2 mt-7  items-center">
            <div className=" bg-sky-200 flex justify-center items-center w-fit p-2 rounded-full">
              <File className="text-sky-700 w-5 h-5" />
            </div>
            <h4 className="text-xl">Resources & Attachment</h4>
          </div>
          <AttachmentForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </section>
  );
};

export default CourseIdPage;
