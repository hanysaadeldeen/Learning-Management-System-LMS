import Logo from "@/app/(dashboard)/_components/(sidebar)/logo";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const RootNavbar = () => {
  const { userId } = auth();

  return (
    <div
      className="flex items-center  justify-between
      py-[10px] px-[30px] w-full shadow-md z-20 "
    >
      <Link href="/">
        <div className=" ">
          <Logo />
        </div>
      </Link>
      {userId ? (
        <Button
          variant="outline"
          className="rounded-2xl border-[#0F086F] border-2 hover:bg-[#0F086F] hover:text-white"
        >
          <Link href="/Dashboard">Dashboard</Link>
        </Button>
      ) : (
        <div className="flex items-center gap-4 ">
          <Button variant="outline" className="rounded-2xl border-green-700">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button className="rounded-2xl border-green-700">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default RootNavbar;
