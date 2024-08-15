import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Attachment, Chapter } from "@prisma/client";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  File,
  TriangleAlert,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import VideoChapter from "./_components/videoChapter";
import EnrollCourse from "./_components/EnrollCourse";
import Description from "./_components/Description";
import { Button } from "@/components/ui/button";
import CourseProgress from "@/components/Course-Progress";
import CourseProgressButton from "../../_components/Course-Progress";
import ChapterAttachemnt from "./_components/Chapter";
import Link from "next/link";

const ChapterCourseID = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      isPublished: true,
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    select: {
      price: true,
      attachment: true,
    },
  });

  if (!chapter || !course) {
    return redirect("/search");
  }

  let muxData = null;
  let attachment: Attachment[] = [];
  let nextChapter: Chapter | null = null;

  if (purchase) {
    attachment = await db.attachment.findMany({
      where: {
        courseId: params.courseId,
      },
    });
  }
  if (chapter.ifFree || purchase) {
    muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    nextChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
        isPublished: true,
        position: {
          gt: chapter?.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  const userProgress = await db.userProgress.findUnique({
    where: {
      chapterId_userId: {
        userId,
        chapterId: params.chapterId,
      },
    },
  });

  const isLocked = !chapter.ifFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <>
      {isLocked && (
        <h1 className="bg-yellow-200 font-medium uppercase py-5 pl-10 flex gap-x-3 text-slate-500">
          <TriangleAlert className="text-red-600" />
          This Chapter is not Free. Paid for open it
        </h1>
      )}
      {userProgress?.isCompleted && (
        <h1 className="bg-emerald-200/50 font-medium uppercase py-5 pl-10 flex gap-x-3 text-emerald-700 ">
          <CheckCircle className="text-emerald-900" />
          You Already complete this chapter
        </h1>
      )}

      <div className="md:p-10 p-4">
        <Link className="flex gap-x-2  mb-7 items-center" href={`/search`}>
          <ArrowLeft className="w-5 h-5 hover:opacity-60  " />
          <p> Back To Course </p>
        </Link>
        <div className="max-w-2xl mx-auto">
          <VideoChapter
            vidUrl={chapter?.videoUrl!}
            chapterId={params.chapterId}
            title={chapter.chapterTitle}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playBackId={muxData?.playbackId!}
            islocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="mt-5 flex pb-3 justify-between max-sm:flex-col items-center">
          <h2 className="text-2xl font-semibold text-slate-700  ">
            {chapter.chapterTitle}
          </h2>
          {purchase ? (
            <CourseProgressButton
              nextChapterId={nextChapter?.id}
              course={params.courseId}
              chapter={params.chapterId}
              check={!!chapter?.isCompleted!}
            />
          ) : (
            <EnrollCourse courseId={params.courseId} price={course.price!} />
          )}
        </div>
        <hr />
        <Description description={chapter.description!} />
        <hr />
        <div>
          {!purchase && (
            <div className="py-2 my-3 flex justify-center border gap-x-3 rounded-md px-6 items-center bg-sky-300 text-slate-600">
              <File className="text-sky-700 w-5 h-5" />
              <h1>Enroll the Course For See Attachment</h1>
            </div>
          )}
          {purchase && attachment.length === 0 && (
            <div className="py-2 my-3 flex justify-center border gap-x-3 rounded-md px-6 items-center bg-emerald-200/50 text-emerald-900">
              <File className="text-sky-700 w-5 h-5" />
              <h1>There is No Attachment At this Course</h1>
            </div>
          )}

          {purchase &&
            attachment.map((attachment) => {
              return (
                <ChapterAttachemnt
                  attachment={attachment}
                  key={attachment.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ChapterCourseID;
