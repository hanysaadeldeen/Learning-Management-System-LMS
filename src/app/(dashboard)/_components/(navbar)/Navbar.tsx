"use client";
import NavbarRoutes from "@/components/Navbar-routes";
import MobileSideBar from "../(sidebar)/Mobile-Side-bar";
import { usePathname } from "next/navigation";
import SearchInput from "@/components/SearchInput";

const Navbar = () => {
  const pathname = usePathname();

  const SearchCheck = pathname?.includes("/search");
  return (
    <div
      className="flex items-center  justify-between
      py-[10px] px-[30px] w-full shadow-md z-20 "
    >
      <MobileSideBar />
      <div className="max-md:hidden">{SearchCheck && <SearchInput />}</div>
      <div className="">
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
