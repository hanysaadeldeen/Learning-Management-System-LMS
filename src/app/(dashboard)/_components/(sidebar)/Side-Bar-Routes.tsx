"use client";
import { Compass, Layout } from "lucide-react";
import React from "react";
import SideBarItem from "./Side-Bar-Item";

const AllRoutes = [
  {
    icon: Layout,
    href: "/",
    label: "Layout",
  },
  {
    icon: Compass,
    href: "/search",
    label: "Browes",
  },
];
export function SideBarRoutes() {
  return (
    <div className="mt-5  w-full flex flex-col ">
      {AllRoutes.map((route) => {
        return (
          <SideBarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
}
