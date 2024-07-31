"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-1 justify-between items-center">
      <div>
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
      </div>
    </div>
  );
};

export default NavbarRoutes;
