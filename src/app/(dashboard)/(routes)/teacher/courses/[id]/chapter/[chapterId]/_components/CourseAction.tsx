"use client";
import ConfirmModal from "@/components/modals/Alert-dialog";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CourseActionType = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};
const CourseAction = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionType) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPupblish, setIsPublish] = useState(false);

  const confetti = useConfettiStore();

  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const DeleteCourse = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/courses/${courseId}`);
      router.refresh();
      toast.success("Deleted Course ");
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong in Delete Course!");
    } finally {
      setIsDeleting(false);
    }
  };
  const UpdatePuplishCourse = async () => {
    try {
      setIsPublish(true);

      if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/Tooglepublish`, {
          isPublished: true,
        });
        toast.success("Course publish  Seccess");
        confetti.opOpn();
      } else {
        await axios.patch(`/api/courses/${courseId}/Tooglepublish`, {
          isPublished: false,
        });
        toast.success("Course Unpublish  Seccess");
      }
      router.refresh();
    } catch (error) {
      toast.error("someThing went wrong!");
    } finally {
      setIsPublish(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isDeleting || isPupblish}
        size={"lg"}
        variant={"outline"}
        onClick={UpdatePuplishCourse}
      >
        {isPublished ? "UpPublish" : "Publish"}
      </Button>
      <Button disabled={isDeleting || isPupblish}>
        <ConfirmModal onConfirm={DeleteCourse}>
          <Trash />
        </ConfirmModal>
      </Button>
    </div>
  );
};

export default CourseAction;
