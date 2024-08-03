"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");

  return (
    <div className="flex gap-3  items-center">
      {isTeacherPage || isPlayerPage ? (
        <Link href={"/"}>
          <Button variant={"ghost"} className="text-xl">
            <LogOut className="h-5 w-5 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button variant={"ghost"} className="text-xl">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;
