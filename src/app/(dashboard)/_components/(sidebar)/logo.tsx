import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      width={65}
      height={65}
      // priority={true}
      // quality={90}
      alt="Logo"
      src={"file:///C:/Users/Hany/Downloads/logoipsum-226.svg"}
    />
  );
};

export default Logo;
