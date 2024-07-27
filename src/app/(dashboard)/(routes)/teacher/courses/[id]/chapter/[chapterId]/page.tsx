import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

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

  // const UpdateData = async () => {
  //   try {
  //     await axios.put(`/api/courses/${params.id}/chapter/${params.chapterId}`);
  //   } catch (error) {
  //     console.error("Client-side error:", error);
  //     toast.error("Something went wrong in Reorder Items!");
  //   }
  // };

  return (
    <div className="p-6">
      <div className="w-full">
        <Link
          className="flex gap-x-2  mb-7 items-center"
          href={`/teacher/courses/${params.id}`}
        >
          <ArrowLeft className="w-5 h-5 hover:opacity-60  " />
          <p> Back To Course </p>
        </Link>
        <div className=" flex items-center justify-between w-full">
          <div className="">
            <h2 className="text-2xl mb-3 font-medium">Chapter Creation</h2>
            <p className="text-slate-600">
              Complete all fields {uncopltetdFileds}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
