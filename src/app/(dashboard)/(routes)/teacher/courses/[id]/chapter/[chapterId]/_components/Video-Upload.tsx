"use client";
import { z } from "zod";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LucidePen, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/File-upload";

import MuxPlayer from "@mux/mux-player-react";

type PropsFormType = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const VideoUploadForm = ({
  initialData,
  courseId,
  chapterId,
}: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      ToogleEditTitle();
      router.refresh();
      toast.success("updated Video Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full">
      <div className="flex justify-between items-center    ">
        <h2 className="">Chapter Video</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              {!initialData.videoUrl ? (
                <>
                  <h3 className=" ">Add Video</h3>
                  <PlusCircle className="h-5 w-5" />
                </>
              ) : (
                <>
                  <h3 className=" ">Edit Video</h3>
                  <LucidePen className="h-5 w-5" />
                </>
              )}
            </>
          ) : (
            <>
              <h3 className="  text-red-400">cancel</h3>
              <FaRegTimesCircle size={20} color="red" />
            </>
          )}
        </div>
      </div>
      {!openEditTitle && !initialData.videoUrl && (
        <div className="flex mt-5 items-center justify-center h-40 bg-slate-200 rounded-md">
          <Video className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {initialData.videoUrl && !openEditTitle && (
        <div className="flex items-center justify-center bg-slate-200 p-3 aspect-video relative mt-5">
          <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
        </div>
      )}
      {initialData.videoUrl && !openEditTitle && (
        <p className="mt-3 ml-1 text-slate-500 text-xs">
          Video can take a few minutes to proccess. Refresh the Page if the
          Video doesn&apos;t appear
        </p>
      )}

      {openEditTitle && (
        <div className="mt-4">
          <FileUpload
            endPoint="chapterVideo"
            onChange={(url) => {
              if (url) onSubmit({ videoUrl: url });
            }}
          />
          <div className="text-xs mt-4 ">Upload this chapter&apos;s Video</div>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
