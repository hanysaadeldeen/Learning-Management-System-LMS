"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CreateCourse = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/teacher/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch {}
    toast.error("someThing went wrong try later!");
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center flex-col md:justify-center h-full p-6">
      <h1 className="text-2xl mb-4">Name Your Course</h1>
      <p className="text-sm mb-4 text-gray-600">
        Name your course is required But you can change it later, don&apos;t
        worry
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Course Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is Your Course Name That Show to the user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href={"/"}>
            <Button className="mr-5" variant="ghost">
              Submit
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
