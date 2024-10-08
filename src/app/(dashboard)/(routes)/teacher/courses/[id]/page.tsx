import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListCheck,
  TriangleAlert,
} from "lucide-react";
import Titleform from "./_components/Title-form";
import DescriptionForm from "./_components/Description-form";
import ImageUploadForm from "./_components/Image-Upload";
import CateogryForm from "./_components/Category-form";
import PriceFrom from "./_components/Price-form";
import AttachmentForm from "./_components/Attachment-form";
import ChapterForm from "./_components/Chapter-form";
import CourseAction from "./chapter/[chapterId]/_components/CourseAction";

const CourseIdPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.id,
      userId,
    },
    include: {
      chapter: {
        orderBy: {
          position: "asc",
        },
      },
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
    course.CategoryId,
    course.chapter.some((chapter) => chapter.isPublished),
  ];

  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;
  const uncopltetdFileds = `(${completedFileds} / ${totalFileds})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <h1 className="bg-yellow-200 font-medium uppercase py-5 pl-10 flex gap-x-3 text-slate-500">
          <TriangleAlert className="text-red-600" />
          This Course is unpublished. it will not be visible to the students
        </h1>
      )}
      <section className="p-10  ">
        <h1 className="text-2xl font-semibold  mb-2 "> Course Setup</h1>
        <div className=" mb-7  flex justify-between items-center w-full ">
          <p className="text-slate-600 ">
            Complete all fields {uncopltetdFileds}
          </p>
          <CourseAction
            disabled={!isComplete}
            courseId={params.id}
            isPublished={course.isPublished}
          />
        </div>
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
            <ChapterForm initialData={course} courseId={course.id} />
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
    </>
  );
};

export default CourseIdPage;
