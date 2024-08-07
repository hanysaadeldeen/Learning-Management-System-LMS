"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type EnrollCoursType = {
  courseId: string;
  price: number;
};
const EnrollCourse = ({ courseId, price }: EnrollCoursType) => {
  const [isLoading, setIsLoading] = useState(false);

  const onclick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        title: "Course Purchase",
      });
      window.location.assign(response.data.url);
      toast.success("Purchase successful!");
    } catch (error) {
      console.log(error);

      toast.error("someThing weng wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button disabled={isLoading} onClick={onclick}>
      Enroll for $ {price}
    </Button>
  );
};

export default EnrollCourse;
