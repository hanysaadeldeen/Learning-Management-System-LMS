import React from "react";
import Navbar from "./_components/(navbar)/Navbar";
import Sidebare from "./_components/(sidebar)/Sidebare";
import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <div className="">
        <div className="navbar md:pl-72 h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
          <Navbar />
        </div>
        <div className="bg-white hidden md:flex flex-col fixed w-72 inset-y-0 z-50 h-full  border-r text-center">
          <Sidebare />
        </div>
      </div>
      <main className="md:pl-72 pt-[80px] pb-10">{children}</main>
      <Toaster position="top-right" reverseOrder={false} />
      <ConfettiProvider />
    </>
  );
};

export default DashboardLayout;
