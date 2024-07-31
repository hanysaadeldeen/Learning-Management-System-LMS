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
import { useRouter } from "next/navigation";
import { FaRegTimesCircle } from "react-icons/fa";
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
  const router = useRouter();
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
      await axios.patch(`/api/courses/${courseId}`, values);
      router.refresh();
      toast.success("Updated Success");
      setOpenEditTitle(false);
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };

  const optionName = options.find(
    (option) => option.value === initialData.CategoryId
  );
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full">
      <div className="flex justify-between items-center  mb-1   ">
        <h2 className="">Category</h2>

        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className="  ">Edit </h3>
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
      {optionName ? (
        <span className="text-slate-500 text-sm mt-4">{optionName.label}</span>
      ) : (
        <span className="text-slate-500 text-sm mt-3">No Category</span>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="CategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isSubmitting}
                        className="w-full py-[15px] px-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200 hover:bg-gray-100 disabled:opacity-50"
                      >
                        {options.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="py-[15px]"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription></FormDescription>
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

export default CateogryForm;
