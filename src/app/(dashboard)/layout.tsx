import React from "react";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: ChildrenTypeAuthLayout) => {
  return <div className="">{children}</div>;
};

export default DashboardLayout;
