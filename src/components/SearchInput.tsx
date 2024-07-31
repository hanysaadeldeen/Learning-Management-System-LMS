"use client";
import { Search } from "lucide-react";

import React, { useEffect, useState } from "react";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import { useDepunced } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const deboundedValue = useDepunced(value);

  const PathName = usePathname();
  const Router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("CategoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: PathName,
        query: {
          title: deboundedValue,
          CategoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    Router.push(url);
  }, [deboundedValue, PathName, Router, currentCategoryId]);

  return (
    <div className="relative flex  items-center   px-2 ">
      <Search className="h-4 cursor-pointer  w-4  absolute left-4 text-slate-500" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px]  rounded-full border-none bg-slate-100 px-8 focus-visible:ring-slate-200"
        placeholder="Search For A Course.."
      />
    </div>
  );
};

export default SearchInput;
