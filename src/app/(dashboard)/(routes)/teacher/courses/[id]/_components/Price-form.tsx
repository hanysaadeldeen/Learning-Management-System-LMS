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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LucidePen } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";

type PropsFormType = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceFrom = ({ initialData, courseId }: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price || undefined },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      ToogleEditTitle();
      router.refresh();
      toast.success("updated Price Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full">
      <div className="flex justify-between items-center  mb-2  ">
        <h2 className="">Price</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className=" ">Edit </h3>
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
      {initialData.price ? (
        <span className="text-slate-500 text- mt-4">${initialData.price}</span>
      ) : (
        <span className="text-slate-500 text- mt-4">No Price</span>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Course Price..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={"/"}>
                <Button className="mr-5" variant="ghost">
                  cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PriceFrom;
