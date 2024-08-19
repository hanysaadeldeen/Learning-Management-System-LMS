import React from "react";
type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const Rootlayout = ({ children }: ChildrenTypeAuthLayout) => {
  return <main>{children}</main>;
};

export default Rootlayout;
