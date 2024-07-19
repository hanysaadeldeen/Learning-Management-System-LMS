import React from "react";
import Sidebare from "./_components/Sidebare";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <div className="h-full md:flex gap-5">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <Sidebare />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
