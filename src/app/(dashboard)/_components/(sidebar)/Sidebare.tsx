import React from "react";
import { SideBarRoutes } from "./Side-Bar-Routes";
import Logo from "./logo";
import Link from "next/link";

const Sidebare = async () => {
  return (
    <>
      <Link href="/">
        <div className="max-md:p-2 p-6 flex justify-center items-center gap-4">
          <Logo />
          <p className="font-bold text-xl text-[#E3073C]  tracking-wider">
            LMS
          </p>
        </div>
      </Link>
      <SideBarRoutes />
    </>
  );
};

export default Sidebare;