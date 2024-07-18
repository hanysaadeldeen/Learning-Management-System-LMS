import React from "react";
import Sidebare from "./_components/Sidebare";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <div className="h-full md:flex gap-5">
      <Sidebare />
      {children}
    </div>
  );
};

export default DashboardLayout;
