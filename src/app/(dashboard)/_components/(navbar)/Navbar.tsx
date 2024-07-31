"use client";
import NavbarRoutes from "@/components/Navbar-routes";
import { UserButton } from "@clerk/nextjs";
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
      {SearchCheck && <SearchInput />}

      <div className="flex gap-3  items-center">
        <NavbarRoutes />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
