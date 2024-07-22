import React from "react";

const CreatedCourse = ({ params }: { params: { id: string } }) => {
  const CourseId = params.id;
  return <div>Course Id is : {CourseId}</div>;
};

export default CreatedCourse;
