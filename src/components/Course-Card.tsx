import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcBookmark } from "react-icons/fc";

type CourseCardProps = {
  id: string;
  title: string;
  imgUrl: string;
  chapterLength: number;
  price: number;
  category: string;
};

const CourseCard = ({
  id,
  title,
  imgUrl,
  chapterLength,
  price,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition-all overflow-hidden border rounded-lg p-1.5 h-full">
        <div className="relative w-full  aspect-video rounded-lg overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imgUrl} />
        </div>
        <div className="mt-4 px-1 flex-col  ">
          <h2 className="capitalize group-hover:text-sky-700 font-semibold max-md:text-base text-lg line-clamp-1">
            {title}
          </h2>
          <div className="flex gap-x-2 items-center mt-2 mb-3">
            <BookOpen className="w-6 h-6 text-slate-500 bg-sky-300  rounded-lg p-1" />
            <p className="text-slate-500">
              {chapterLength}
              {chapterLength > 1 ? " Chapters" : " Chapter"}
            </p>
          </div>
          <div className="flex  mt-2  items-center justify-between">
            <h2 className="ml-0.5 text-slate-700 font-medium text-md">
              ${price}
            </h2>
            <div className="flex items-center gap-2">
              <FcBookmark className="w-4 h-4" />

              <div className="">
                <p className="text-sm">{category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
