"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, LucidePen } from "lucide-react";
import { useState } from "react";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChapterList } from "./Chapter-List";
import { cn } from "@/lib/utils";

type ChapterForm = {
  initialData: Course & { chapter: Chapter[] };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterForm = ({ initialData, courseId }: ChapterForm) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const [isupdating, setIsUpdating] = useState(false);

  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapter`, values);
      ToogleEditTitle();
      router.refresh();
      toast.success("updated Shapter Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapter/reOrder`, {
        list: updateData,
      });
      toast.success("Reorder Success");
      router.refresh();
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong in Reorder Items!");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapter/${id}`);
    // try {
    //   await axios.put(`/api/courses/${courseId}/chapter/${id}`);
    // } catch (error) {
    //   console.error("Client-side error:", error);
    //   toast.error("Something went wrong in Reorder Items!");
    // }
  };

  return (
    <div className={"mt-6 bg-slate-100 relative p-4 mb-7 rounded-md w-full"}>
      {isupdating && (
        <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center bg-slate-500/20 rounded-md ">
          <Loader2 className="animate-spin h-7 w-7 text-sky-500  " />
        </div>
      )}

      <div className="flex justify-between mb-2 items-center">
        <h2 className="">Course Chpaters</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className=" ">Add Chapter </h3>
              <LucidePen className="h-5 w-5" />
            </>
          ) : (
            <>
              <h3 className="  text-red-400">cancel</h3>
              <FaRegTimesCircle size={20} color="red" />
            </>
          )}
        </div>
      </div>
      {!openEditTitle && initialData.chapter.length === 0 && (
        <span className="text-slate-500 line-clamp-1 text- mt-4">
          No Chapters yet
        </span>
      )}
      {!openEditTitle && initialData.chapter.length > 0 && (
        <ChapterList
          onEdit={onEdit}
          items={initialData.chapter || []}
          onRecord={onReorder}
        />
      )}

      {!openEditTitle && (
        <span className="text-slate-500 line-clamp-1 text- mt-4">
          Drag And Drop to Render the Chapter
        </span>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add Chapter Title..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={"/"}>
                <Button className="mr-5" variant="ghost">
                  cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Create 🖋️
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
