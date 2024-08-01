import Image from "next/image";
import Link from "next/link";
import React from "react";

type CourseCardProps = {
  data: {
    id: string;
    title: string;
    imageUrl: string;
    chapterLength: number;
    price: number;
    progress: number | null;
    category: string;
  };
};

const CourseCard = ({ data }: CourseCardProps) => {
  return (
    <Link href={`/courses/${data.id}`}>
      <div className="group hover:shadow-sm transition-all overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full  aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={data.title}
            src={data.imageUrl}
          />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
