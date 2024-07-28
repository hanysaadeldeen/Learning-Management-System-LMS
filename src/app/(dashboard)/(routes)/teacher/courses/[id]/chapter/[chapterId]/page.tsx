import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { ArrowLeft, EyeIcon, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import TitleformChapter from "./_components/Title-form-chapter";
import DescriptionformChapter from "./_components/Description-form-chapter copy";
import AccessformChapter from "./_components/Access-form-chapter";
import VideoUploadForm from "./_components/Video-Upload";

type ChapterType = { params: { id: string; chapterId: string } };

const page = async ({ params }: ChapterType) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const Chapter = await db.chapter.findUnique({
    where: {
      courseId: params.id,
      id: params.chapterId,
    },
    include: {
      muxData: true,
    },
  });

  if (!Chapter) {
    return redirect("/");
  }

  const requiredFields = [
    Chapter.chapterTitle,
    Chapter.description,
    Chapter.videoUrl,
  ];

  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;
  const uncopltetdFileds = `(${completedFileds} / ${totalFileds})`;

  return (
    <div className="p-10  mb-20">
      <div className="w-full">
        <Link
          className="flex gap-x-2  mb-7 items-center"
          href={`/teacher/courses/${params.id}`}
        >
          <ArrowLeft className="w-5 h-5 hover:opacity-60  " />
          <p> Back To Course </p>
        </Link>
        <div className="w-full">
          <h2 className="text-2xl mb-3 font-medium">Chapter Creation</h2>
          <p className="text-slate-600  mb-7 ">
            Complete all fields {uncopltetdFileds}
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-11 h-10 bg-sky-200 flex justify-center items-center  rounded-full">
              <LayoutDashboard className=" text-sky-700 " />
            </div>
            <h2 className="text-xl"> Customize Your Chapter</h2>
          </div>
          <div className="max-lg:flex-col gap-10 flex  w-full">
            <div className="max-lg:w-full w-1/2">
              <TitleformChapter
                initialData={Chapter}
                chapterId={params.chapterId}
                courseId={params.id}
              />
              <DescriptionformChapter
                initialData={Chapter}
                chapterId={params.chapterId}
                courseId={params.id}
              />

              <div className="flex gap-2 mt-7 items-center">
                <div className="w-11 h-10 bg-sky-200 flex justify-center items-center  rounded-full">
                  <EyeIcon className=" text-sky-700 " />
                </div>
                <h2 className="text-xl"> Access Settings</h2>
              </div>
              <AccessformChapter
                initialData={Chapter}
                chapterId={params.chapterId}
                courseId={params.id}
              />
            </div>
            <div className="max-lg:w-full w-1/2">
              <div className="flex gap-2 mt-7  items-center">
                <div className="w-11 h-10 bg-sky-200 flex justify-center items-center  rounded-full">
                  <Video className=" text-sky-700 " />
                </div>
                <h2 className="text-xl"> Upload Video</h2>
              </div>
              <VideoUploadForm
                initialData={Chapter}
                chapterId={params.chapterId}
                courseId={params.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
