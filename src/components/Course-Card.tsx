import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBase } from "react-icons";
import CourseProgress from "./Course-Progress";

type CourseCardProps = {
  id: string;
  title: string;
  imgUrl: string;
  chapterLength: number;
  price: number;
  progress: number | null;
  category: string;
};

const CourseCard = ({
  id,
  title,
  imgUrl,
  chapterLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition-all overflow-hidden border rounded-lg p-1.5 h-full">
        <div className="relative w-full  aspect-video rounded-lg overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imgUrl} />
        </div>
        <div className="mt-4 px-1 flex-col  ">
          <h2 className="capitalize group-hover:text-sky-700 max-md:text-base text-lg line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{category}</p>
          <div className="flex gap-x-2 items-center mt-2 ">
            <BookOpen className="w-6 h-6 text-slate-500 bg-sky-300  rounded-lg p-1" />
            <p className="text-slate-500">
              {chapterLength}
              {chapterLength > 1 ? " Chapters" : " Chapter"}
            </p>
          </div>
          <h2 className=" mt-2 ml-0.5 text-slate-700 font-medium text-md">
            ${price}
          </h2>
          <CourseProgress progress={progress!} />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
