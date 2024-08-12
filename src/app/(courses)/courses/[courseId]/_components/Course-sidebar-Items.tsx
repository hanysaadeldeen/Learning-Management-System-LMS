"use client";
import { cn } from "@/lib/utils";
import { Purchase } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type CourseItemtype = {
  id: string;
  isLocked: boolean;
  courseId: string;
  title: string;
  isComplete: boolean;
  purhase: Purchase;
};

const CourseSidebarItems = ({
  id,
  isLocked,
  courseId,
  title,
  isComplete,
  purhase,
}: CourseItemtype) => {
  const pathName = usePathname();

  const isActive = pathName?.includes(id);

  /* 

1=check if (the purchse is not null) => check if he complete the chapter or not 
2=else (purchase is null)=> if chapter is free =>if he complete or not


*/
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
          {purhase &&
            (isComplete ? (
              <CheckCircle className="w-7 h-7    rounded-lg p-1" />
            ) : (
              <PlayCircle className="w-7 h-7    rounded-lg p-1" />
            ))}

          {!purhase &&
            (isLocked ? (
              <Lock className="w-7 h-7  rounded-lg p-1" />
            ) : isComplete ? (
              <CheckCircle className="w-7 h-7    rounded-lg p-1" />
            ) : (
              <PlayCircle className="w-7 h-7    rounded-lg p-1" />
            ))}
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
