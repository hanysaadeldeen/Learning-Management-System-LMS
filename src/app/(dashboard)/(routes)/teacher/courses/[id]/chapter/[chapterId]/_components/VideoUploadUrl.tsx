"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
// import { Edit, X } from "lucide-react";
import { LucidePen, Play, PlusCircle, Video } from "lucide-react";
import { FaRegTimesCircle } from "react-icons/fa";

import { useState } from "react";
import { Chapter } from "@prisma/client";

interface VideoFormUrl {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().url("Invalid URL").min(1, "URL is required"),
});

const VideoUploadUrl = ({ initialData, courseId, chapterId }: VideoFormUrl) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoUrl: initialData?.videoUrl || undefined },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      toast.success("Chapter updated successfully!");
      router.refresh();
      setAllowed(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const ToogleEditTitle = () => {
    setAllowed(!allowed);
  };

  return (
    <div className="bg-slate-100 p-4 rounded-md shadow-sm mt-6 select-none">
      <div className="flex items-center gap-3 bg-slate-100 justify-between">
        <span className="text-lg">Chapter External URL Video</span>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {allowed ? (
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
      {allowed ? (
        initialData.videoUrl ? (
          <div className="pt-5 text-lg font-bold text-green-900">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-900">
              <ReactPlayer
                url={initialData.videoUrl || ""}
                className="absolute top-0 left-0 w-full h-full"
                controls
                width="100%"
                height="100%"
              />
            </div>
          </div>
        ) : (
          <div className="text-lg font-bold h-52  ">
            <div className="relative h-full overflow-hidden gap-x-4 flex items-center justify-center bg-slate-100 ">
              <Play className="h-10 w-10 text-slate-500" />
              <p className="text-slate-500">Add Video</p>
            </div>
          </div>
        )
      ) : null}
      {!allowed ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Add URL of the Video"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting || !isValid}>
              Submit
            </Button>
          </form>
        </Form>
      ) : null}
    </div>
  );
};

export default VideoUploadUrl;
