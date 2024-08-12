"use client";
import { Download, File } from "lucide-react";
import React from "react";

const ChapterAttachemnt = ({
  attachment,
}: {
  attachment: { id: string; name: string; url: string };
}) => {
  return (
    <div
      key={attachment.id}
      className="py-2 my-3   flex justify-between border rounded-md px-6 items-center bg-sky-300 text-slate-600"
    >
      <div className="flex gap-x-3 items-center  w-full">
        <File className="text-sky-700 w-5 h-5" />
        <h1>{attachment.name}</h1>
      </div>
      <a href={attachment.url} download target="_blanck">
        <Download className="hover:text-sky-900 transition cursor-pointer text-slate-500 w-5 h-5" />
      </a>
    </div>
  );
};

export default ChapterAttachemnt;
