"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SideBarItem from "./Side-Bar-Item";
import { usePathname } from "next/navigation";

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
const TeacherRoutes = [
  {
    icon: List,
    href: "/teacher/courses",
    label: "Courses",
  },
  {
    icon: BarChart,
    href: "/teacher/analytics",
    label: "Analytics",
  },
];
export function SideBarRoutes() {
  const PathType = usePathname();
  const RouteRole = PathType.startsWith("/teacher");

  const Routes = RouteRole ? TeacherRoutes : AllRoutes;

  return (
    <div className="mt-5  w-full flex flex-col ">
      {Routes.map((route) => {
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
