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
  const [isPupblish, setIsPublish] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const DeleteChpater = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`);
      toast.success("Deleted Success");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  const UpdatePuplishChapter = async () => {
    try {
      setIsPublish(true);
      await axios.put(`/api/courses/${courseId}/chapter/${chapterId}/publish`);
      router.refresh();
      toast.success("Update Chatper Status Seccess");
    } catch (error) {
      console.log(error);

      toast.error("SomeThings went wrong in Publish!");
    } finally {
      setIsPublish(false);
    }
  };
  const UpdateUpPuplishChapter = async () => {
    try {
      setIsPublish(true);
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}/Unpublish`
      );
      router.refresh();
      toast.success("Update Chatper Status Seccess");
    } catch (error) {
      toast.error("SomeThings went wrong in Publish!");
    } finally {
      setIsPublish(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isDeleting}
        size={"lg"}
        variant={"outline"}
        onClick={UpdatePuplishChapter}
        // onClick={!isPublished ? UpdatePuplishChapter : UpdateUpPuplishChapter}
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
