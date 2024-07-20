import React from "react";
import Navbar from "./_components/(navbar)/Navbar";
import Sidebare from "./_components/(sidebar)/Sidebare";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <div>
        <div className="navbar md:pl-56 h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
          <Navbar />
        </div>
        <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-40">
          <Sidebare />
        </div>
        <main className="md:pl-56 w-full pt-[80px]">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
