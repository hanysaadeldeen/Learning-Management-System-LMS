import { icons, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface typePropRoute {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SideBarItem = ({ icon, label, href }: typePropRoute) => {
  return (
    <Link href={href}>
      <div className="flex gap-2 items-center">
        {/* <Image src={icon} alt="icon" /> */}
        <h3>{label}</h3>
      </div>
    </Link>
  );
};

export default SideBarItem;
