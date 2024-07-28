"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
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
import { LucidePen } from "lucide-react";
import { useState } from "react";
import { Chapter } from "@prisma/client";
import { Preview } from "@/components/Preview";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  ifFree: z.boolean().default(false),
});

type PropsFormType = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const AccessformChapter = ({
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
    defaultValues: { ifFree: !!initialData.ifFree },
    // defaultValues: { ifFree: Boolean(initialData.ifFree) },
    // defaultValues: initialData,
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
      toast.success("Update Chapter Access Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full ">
      <div className="flex justify-between mb-2 items-center    ">
        <h2 className=" ">Chapter Access </h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className="">Edit Access</h3>
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
      {!openEditTitle && initialData.description && (
        <span className="  text-slate-800 line-clamp-1 text- mt-4">
          {initialData.ifFree
            ? "This chapter is Free for preview"
            : "This chapter is Paid"}
        </span>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="ifFree"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-slate-500 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Make It Free
                        </label>
                      </div>
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
        </div>
      )}
    </div>
  );
};

export default AccessformChapter;
