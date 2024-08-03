import React from "react";
import NavbarRoutes from "@/components/Navbar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSidebar from "./Course-Sidebar";
type CourseSidebarType = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  ProgressCount: number;
};

const CourseNavBar = ({ course, ProgressCount }: CourseSidebarType) => {
  return (
    <div
      className="flex items-center md:justify-end  justify-between
      py-[10px] px-[30px] w-full shadow-md z-20 "
    >
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="hover:opacity-75 transition">
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0">
            <CourseSidebar course={course} ProgressCount={ProgressCount} />
          </SheetContent>
        </Sheet>
      </div>
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavBar;
