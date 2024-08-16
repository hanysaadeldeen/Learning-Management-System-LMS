import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      width={130}
      height={130}
      priority={true}
      quality={90}
      alt="Logo"
      src={"/LOGO.jpg"}
    />
  );
};

export default Logo;
