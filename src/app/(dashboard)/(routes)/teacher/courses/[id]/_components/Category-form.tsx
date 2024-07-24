"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";
import { LucidePen } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type PropsFormType = {
  initialData: Course;
  courseId: string;
  options: {
    value: string;
    label: string;
  }[];
};

const formSchema = z.object({
  CategoryId: z.string().min(1),
});

const CateogryForm = ({ initialData, courseId, options }: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { CategoryId: initialData.CategoryId || "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.get(`/api/courses`);
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md md:w-1/2">
      <div className="flex justify-between items-center    ">
        <h2 className="">Category</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle && (
            <>
              <h3 className=" ">Edit </h3>
              <LucidePen className="h-5 w-5" />
            </>
          )}
        </div>
      </div>
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="CategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>{/* <Combobox /> */}</FormControl>
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
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CateogryForm;
