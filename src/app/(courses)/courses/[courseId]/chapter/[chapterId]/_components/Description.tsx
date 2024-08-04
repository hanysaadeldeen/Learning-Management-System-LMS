import { Preview } from "@/components/Preview";
import React from "react";

const Description = ({ description }: { description: string }) => {
  return (
    <div className="pt-3 leading-6">
      <h3 className="text-2xl m-0 p-0 text-sky-600">Description</h3>
      <p className="text-slate-600 ">
        <Preview value={description} />
      </p>
    </div>
  );
};

export default Description;
