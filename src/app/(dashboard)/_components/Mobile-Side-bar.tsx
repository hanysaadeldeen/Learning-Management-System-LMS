import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileSideBar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden m-5 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <h2>hello</h2>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
