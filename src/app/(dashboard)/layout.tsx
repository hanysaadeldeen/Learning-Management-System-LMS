import React from "react";
import Sidebare from "./_components/Sidebare";
import Navbar from "./_components/Navbar";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <div className="h-full md:flex ">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <Sidebare />
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
