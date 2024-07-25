"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { FaRegTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/File-upload";

type PropsFormType = {
  initialData: Course & { attachment: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: PropsFormType) => {
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const ToogleEditTitle = () => {
    setOpenEditTitle(!openEditTitle);
  };
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values);
      ToogleEditTitle();
      router.refresh();
      toast.success("Added File Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong!");
    }
  };

  const DeleteAttachment = async (id: string) => {
    try {
      console.log(id);

      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachment/${id}`);
      ToogleEditTitle();
      // router.refresh();
      toast.success("Deleted File Success");
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("Something went wrong !");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6 bg-slate-100 p-4 rounded-md w-full">
      <div className="flex justify-between items-center    ">
        <h2 className="mb-2">Course Attachment</h2>
        <div
          onClick={ToogleEditTitle}
          className="cursor-pointer flex items-center gap-2"
        >
          {!openEditTitle ? (
            <>
              <h3 className=" ">Add File</h3>
              <PlusCircle className="h-5 w-5" />
            </>
          ) : (
            <>
              <h3 className="  text-red-400">cancel</h3>
              <FaRegTimesCircle size={20} color="red" />
            </>
          )}
        </div>
      </div>
      {!openEditTitle && (
        <div className="text-slate-500">
          {initialData.attachment.length === 0 && "No Attachment"}
        </div>
      )}
      {!openEditTitle && (
        <div className="text-slate-500">
          {initialData.attachment.length >= 1 &&
            initialData.attachment.map((Attachment) => {
              return (
                <div
                  key={Attachment.id}
                  className="bg-sky-100 flex gap-6 p-2 items-center border-sky-200 border  rounded-md  m-2"
                >
                  <File className="flex-shrink-0 text-sky-700" />
                  <p className=" text-sky-700 line-clamp-1">
                    {Attachment.name}
                  </p>
                  {deletingId === Attachment.id && (
                    <Loader2 className="animate-spin" />
                  )}
                  {deletingId !== Attachment.id && (
                    <button onClick={() => DeleteAttachment(Attachment.id)}>
                      <X className="cursor-pointer hover:text-red-600 transition-all" />
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}
      {openEditTitle && (
        <div className="mt-4">
          <FileUpload
            endPoint="couresAttachment"
            onChange={(url) => {
              if (url) onSubmit({ url: url });
            }}
          />
          <div className="text-xs mt-4 ">
            Add AnyThing To Your Students For Help Them in Course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
