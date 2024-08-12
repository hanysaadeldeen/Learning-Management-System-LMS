import React from "react";

const CourseProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="font-semibold text-sm  text-sky-400 capitalize text-center">
      {Math.round(progress)}% Complete
    </div>
  );
};

export default CourseProgress;
