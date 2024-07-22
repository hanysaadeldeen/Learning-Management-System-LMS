import NavbarRoutes from "@/components/Navbar-routes";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../(sidebar)/Mobile-Side-bar";

const Navbar = () => {
  return (
    <div className="flex items-center md:justify-end justify-between  py-[10px] px-[30px] w-full shadow-md z-20 ">
      <MobileSideBar />
      <div className="flex gap-3 items-center">
        <NavbarRoutes />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
