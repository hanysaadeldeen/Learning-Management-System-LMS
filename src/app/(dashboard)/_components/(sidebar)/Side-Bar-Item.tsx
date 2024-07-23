"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

interface typePropRoute {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SideBarItem = ({ icon: Icon, label, href }: typePropRoute) => {
  const pathName = usePathname();
  const router = useRouter();

  const part1 = pathName.split("/").filter(Boolean);
  const part2 = href.split("/").filter(Boolean);
  const firstPartPath1 = part1.length > 0 ? part1[1] : null;
  const firstPartPath2 = part2.length > 0 ? part2[1] : null;

  const isActive = firstPartPath1 === firstPartPath2;

  const Onclick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={Onclick}
      className={cn(
        "text-slate-500 group relative  hover:bg-sky-500/20  hover:text-sky-500  transition-all  pl-6 flex items-center ",
        isActive && "bg-sky-500/20  text-sky-500 "
      )}
    >
      <Icon
        className={cn(
          "mr-4 text-sm text-slate-500  group-hover:text-sky-500 ",
          isActive && "text-sky-500"
        )}
      />
      <h3 className="py-3">{label}</h3>
      <div
        className={cn(
          "border-r-4 ml-auto absolute right-0  opacity-0 border-sky-700 h-full ",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SideBarItem;
