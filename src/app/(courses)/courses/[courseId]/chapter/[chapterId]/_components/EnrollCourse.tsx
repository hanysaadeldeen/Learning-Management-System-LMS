"use client";
import { Button } from "@/components/ui/button";
import React from "react";

type EnrollCoursType = {
  courseId: string;
  price: number;
};
const EnrollCourse = ({ courseId, price }: EnrollCoursType) => {
  return <Button> Enroll for $ {price}</Button>;
};

export default EnrollCourse;
