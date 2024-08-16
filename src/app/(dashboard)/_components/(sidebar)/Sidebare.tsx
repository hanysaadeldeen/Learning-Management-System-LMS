import React from "react";
import { SideBarRoutes } from "./Side-Bar-Routes";
import Logo from "./logo";
import Link from "next/link";

const Sidebare = () => {
  return (
    <>
      <Link href="/">
        <div className=" pb-1 pt-6 flex justify-center ">
          <Logo />
        </div>
      </Link>
      <SideBarRoutes />
    </>
  );
};

export default Sidebare;
