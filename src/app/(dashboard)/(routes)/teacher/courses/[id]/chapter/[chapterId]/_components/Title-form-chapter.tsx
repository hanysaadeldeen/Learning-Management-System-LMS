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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LucidePen } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  chapterTitle: z.string().min(1),
});

type PropsFormType = {
  initialData: {
    chapterTitle: string;
  };
  courseId: string;
  chapterId: string;
};

const TitleformChapter = ({
  initialData,
  courseId,
  chapterId,
}: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values
      );
      ToogleEditTitle();
      router.refresh();
      toast.success("Update Chapter Title Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full ">
      <div className="flex justify-between mb-2 items-center    ">
        <h2 className=" ">Chapter Title</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className="  ">Edit Title</h3>
              <LucidePen className="h-5 w-5" />
            </>
          ) : (
            <>
              <h3 className="   text-red-400">cancel</h3>
              <FaRegTimesCircle size={20} color="red" />
            </>
          )}
        </div>
      </div>
      {!openEditTitle && initialData.chapterTitle && (
        <span className="text-slate-500 text- mt-4">
          {initialData.chapterTitle}
        </span>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="chapterTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Chapter Name"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={"/"}></Link>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default TitleformChapter;
