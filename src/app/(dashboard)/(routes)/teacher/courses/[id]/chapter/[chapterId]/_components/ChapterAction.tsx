"use client";
import ConfirmModal from "@/components/modals/Alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ActineType = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

const ChapterAction = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ActineType) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const DeleteChpater = async () => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`);
      setIsDeleting(true);
      toast.success("Deleted Success");
      router.push("/teacher/courses");
    } catch (error) {
      console.log(error);
      return new NextResponse("there is An Error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled}
        size={"lg"}
        variant={"outline"}
        onClick={() => {}}
      >
        {isPublished ? "UpPublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={DeleteChpater}>
        <Button disabled={isDeleting}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterAction;
