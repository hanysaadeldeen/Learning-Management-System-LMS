"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type EnrollCoursType = {
  courseId: string;
  userId: string;
  price: number;
};
const EnrollCourse = ({ userId, courseId, price }: EnrollCoursType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const UpdatePurchase = async () => {
    console.log("finalyyyy");

    try {
      await axios.post(`/api/courses/${courseId}/purchase`, {
        userId,
        courseId,
      });
      toast.success("Purchase successful!");
      router.refresh();
    } catch (e) {
      toast.error("Purchase Fail!");
    }
  };

  const onclick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        title: "Course Purchase",
      });
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("someThing weng wrong");
    } finally {
      setIsLoading(false);
      UpdatePurchase();
    }
  };
  return (
    <Button disabled={isLoading} onClick={onclick}>
      Enroll for $ {price}
    </Button>
  );
};

export default EnrollCourse;
