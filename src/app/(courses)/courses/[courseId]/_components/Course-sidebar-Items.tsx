"use client";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type CourseItemtype = {
  id: string;
  isLocked: boolean;
  courseId: string;
  title: string;
  isComplete: boolean;
};

const CourseSidebarItems = ({
  id,
  isLocked,
  courseId,
  title,
  isComplete,
}: CourseItemtype) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName?.includes(id);

  return (
    <Link href={`/courses/${courseId}/chapter/${id}`}>
      <div
        className={cn(
          "px-6  py-4 relative flex justify-between items-center w-full hover:bg-slate-200 transition text-slate-500 hover:text-slate-700 ",
          isActive && "bg-sky-200/60 text-slate-700 ",
          isComplete && "text-emerald-700 ",
          isComplete && isActive && "bg-emerald-200/50"
        )}
      >
        <h2 className="text-xl capitalize  font-semibold">{title}</h2>
        <span>
          {isLocked ? (
            <Lock className="w-7 h-7  rounded-lg p-1" />
          ) : isComplete ? (
            <CheckCircle className="w-7 h-7    rounded-lg p-1" />
          ) : (
            <PlayCircle className="w-7 h-7    rounded-lg p-1" />
          )}
        </span>
        <div
          className={cn(
            "border-r-4 ml-auto absolute right-0  opacity-0 border-sky-700 h-full ",
            isActive && "opacity-100"
          )}
        />
      </div>
    </Link>
  );
};

export default CourseSidebarItems;
