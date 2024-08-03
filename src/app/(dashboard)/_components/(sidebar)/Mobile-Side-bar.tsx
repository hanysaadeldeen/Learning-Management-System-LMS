"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebare from "./Sidebare";

const MobileSideBar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <Sidebare />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
