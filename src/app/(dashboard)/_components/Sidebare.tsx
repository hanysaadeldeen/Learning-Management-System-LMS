import React from "react";
import Logo from "./logo";
import { SideBarRoutes } from "./Side-Bar-Routes";

const Sidebare = async () => {
  return (
    <div className=" hidden md:flex flex-col w-56 inset-y-0 z-50 h-full relative border-r text-center ">
      <div className=" p-6 flex justify-center items-center gap-4">
        <Logo />
        <p className="font-bold text-xl text-[#E3073C]  tracking-wider">LMS</p>
      </div>
      <SideBarRoutes />
    </div>
  );
};

export default Sidebare;
