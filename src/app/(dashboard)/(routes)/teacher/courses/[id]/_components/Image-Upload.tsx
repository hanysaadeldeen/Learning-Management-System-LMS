"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImageIcon, LucidePen, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/File-upload";

type PropsFormType = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imgUrl: z.string().min(2, {
    message: "Image is required",
  }),
});

const ImageUploadForm = ({ initialData, courseId }: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      ToogleEditTitle();
      router.refresh();
      toast.success("updated Image Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md md:w-1/2">
      <div className="flex justify-between items-center    ">
        <h2 className="">Course Image</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              {!initialData.imgUrl ? (
                <>
                  <h3 className=" ">Add Image</h3>
                  <PlusCircle className="h-5 w-5" />
                </>
              ) : (
                <>
                  <h3 className=" ">Edit Image</h3>
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
      {!openEditTitle && !initialData.imgUrl ? (
        <div className="flex mt-5 items-center justify-center h-40 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-slate-200 p-3 aspect-video relative mt-5">
          <Image
            src={initialData.imgUrl || "/placeholder-image.png"}
            fill
            className="object-fill rounded-md"
            alt="Your Image"
          />
        </div>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <FileUpload
            endPoint="CourseImage"
            onChange={(url) => {
              if (url) onSubmit({ imgUrl: url });
            }}
          />
          <div className="text-xs mt-4 ">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
