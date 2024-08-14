"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

type ChapterType = {
  check: boolean;
  chapter: string;
  course: string;
  nextChapterId?: string;
};

const CourseProgressButton = ({
  nextChapterId,
  check,
  chapter,
  course,
}: ChapterType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const confetti = useConfettiStore();

  const CompleteChapter = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/courses/${course}/chapter/${chapter}/progress`, {
        isCompleted: !check,
      });

      if (!nextChapterId && !check) {
        confetti.opOpn();
      }
      if (!check && nextChapterId) {
        router.push(`/courses/${course}/chapter/${nextChapterId}`);
      }
      toast.success("Progress Updated");
      router.refresh();
    } catch (error) {
      toast.error("SomeThing Went Wrong AT Complete Chapter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      className="flex items-center gap-3 max-sm:w-full max-sm:mt-3 bg-emerald-600 text-white"
      onClick={CompleteChapter}
    >
      <CheckCircle className="h-4 w-4" />
      {!check ? `Mark as Completed` : "UnCompleted"}
    </Button>
  );
};

export default CourseProgressButton;
