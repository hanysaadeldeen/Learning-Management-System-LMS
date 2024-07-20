import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

const MobileSideBar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}></SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
