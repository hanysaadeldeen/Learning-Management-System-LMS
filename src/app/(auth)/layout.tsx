import React from "react";

type ChildrenTypeAuthLayout = {
  children: React.ReactNode;
};

const Authlayout = ({ children }: ChildrenTypeAuthLayout) => {
  return (
    <div className="h-[90%] flex justify-center items-center">{children}</div>
  );
};

export default Authlayout;
