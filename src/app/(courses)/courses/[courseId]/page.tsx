import React from "react";

const SpecificCourse = ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;
  return (
    <div>
      <h1>hello there </h1>
      <p>{courseId}</p>
    </div>
  );
};

export default SpecificCourse;
