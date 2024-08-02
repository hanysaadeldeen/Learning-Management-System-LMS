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
          isActive && "bg-slate-200/20 text-slate-700 ",
          isComplete && "text-emerald-700 ",
          isComplete && isActive && "bg-emerald-200/20"
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
            "border-r-4 ml-auto absolute right-0  opacity-100 border-sky-700 h-full ",
            isActive && "opacity-100"
          )}
        />
      </div>
    </Link>

    // <button
    //   className={cn(
    //     "text-slate-500 group relative  hover:bg-sky-500/20  hover:text-sky-500  transition-all  pl-6 flex items-center ",
    //     isActive && "bg-sky-500/20  text-sky-500 "
    //   )}
    // >
    //   <Icon
    //     className={cn(
    //       "mr-4 text-sm text-slate-500  group-hover:text-sky-500 ",
    //       isActive && "text-sky-500"
    //     )}
    //   />
    //   <h3 className="py-3">{label}</h3>
    //   <div
    //     className={cn(
    //       "border-r-4 ml-auto absolute right-0  opacity-0 border-sky-700 h-full ",
    //       isActive && "opacity-100"
    //     )}
    //   />
    // </button>
  );
};

export default CourseSidebarItems;
