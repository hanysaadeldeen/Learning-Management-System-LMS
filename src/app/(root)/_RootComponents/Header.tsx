import Image from "next/image";
import React from "react";

import img from "/src/app/assets/5.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Header = () => {
  return (
    <header
      className="  bg-gradient-to-b to-blue-200 from-white h-screen flex items-center
      justify-center "
    >
      <div className="max-w-screen-xl  py-[10px] px-[30px] flex justify-center gap-x-20 items-center max-lg:flex-col">
        <Image
          src={img}
          alt="Hero Image"
          className="rounded-lg shadow-md mb-4 max-sm:hidden max-lg:mb-7 w-[600px] h-[350px] max-lg:w-[400px] max-lg:h-[250px]"
        />
        <div className="flex flex-col  items-center gap-y-4 justify-center">
          <h1 className="text-4xl font-bold text-center  text-gray-900">
            <span className="text-blue-500">Find</span> Your{" "}
            <span className="text-green-500">Passion</span>
          </h1>
          <p className="text-lg text-center  text-gray-500">
            Are you looking to explore new career opportunities and find your
            true calling? Do you seek clarity and guidance in your professional
            journey? We understand the importance of choosing the right career
            path that aligns with your passions and goals.
          </p>
          <Link href="/Dashboard">
            <Button
              variant="outline"
              className="rounded-2xl text-center border-blue-200 w-fit border-2 bg-[#0F086F] text-white"
            >
              Start Your Journey
            </Button>{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
