import React from "react";
import { SideBarRoutes } from "./Side-Bar-Routes";
import Logo from "./logo";
import Link from "next/link";

const Sidebare = async () => {
  return (
    <div className="bg-white  hidden md:flex flex-col w-56 inset-y-0 z-50 h-full relative border-r text-center ">
      <Link href="/">
        <div className=" p-6 flex justify-center items-center gap-4">
          <Logo />
          <p className="font-bold text-xl text-[#E3073C]  tracking-wider">
            LMS
          </p>
        </div>
      </Link>
      <SideBarRoutes />
    </div>
  );
};

export default Sidebare;
