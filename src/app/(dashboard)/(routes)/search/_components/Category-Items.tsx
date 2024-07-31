"use client";
import React from "react";
import { IconBaseProps } from "react-icons";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type CategoryItemType = {
  label: string;
  icon: React.ComponentType<IconBaseProps>;
  value: string;
};

const CategoryItems = ({ label, icon: Icon, value }: CategoryItemType) => {
  const PathName = usePathname();
  const Router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("CategoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: PathName,
        query: {
          title: currentTitle,
          CategoryId: isSelected ? null : value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    Router.push(url);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-slate-200   hover:border-sky-700 gap-x-1 w-fit px-2 rounded-full py-3 flex items-center",
        isSelected && "border-sky-700"
      )}
    >
      {Icon && <Icon size={20} />}
      <p className="text-sm truncate">{label}</p>
    </div>
  );
};
export default CategoryItems;
