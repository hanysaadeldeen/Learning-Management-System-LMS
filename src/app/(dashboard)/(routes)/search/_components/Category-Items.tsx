"use client";
import React from "react";
import { IconBaseProps } from "react-icons";
type CategoryItemType = {
  label: string;
  icon: React.ComponentType<IconBaseProps>;
  value: string;
};

const CategoryItems = ({ label, icon: Icon, value }: CategoryItemType) => {
  return (
    <div className="border border-slate-200   hover:border-sky-700 gap-x-1 w-fit px-2 rounded-full py-3 flex items-center   ">
      {Icon && <Icon size={20} />}
      <p className="text-sm truncate">{label}</p>
    </div>
  );
};
export default CategoryItems;
