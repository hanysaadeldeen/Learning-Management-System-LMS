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
  return <div>CourseCard</div>;
};

export default CourseCard;
