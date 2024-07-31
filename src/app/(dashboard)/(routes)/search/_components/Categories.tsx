"use client";
import { Category } from "@prisma/client";
import {
  FcElectronics,
  FcEngineering,
  FcCamera,
  FcFlashAuto,
  FcCommandLine,
  FcBusiness,
  FcSynchronize,
} from "react-icons/fc";
import React from "react";
import CategoryItems from "./Category-Items";

const iconMap: Record<Category["name"], React.ComponentType> = {
  "Computer Science": FcElectronics,
  Engineering: FcEngineering,
  Filming: FcCamera,
  Fitness: FcFlashAuto,
  Graphiic: FcCommandLine,
  "Information Technology": FcBusiness,
  Logic: FcSynchronize,
};

type CateogriesSearchType = {
  items: {
    id: string;
    name: string;
  }[];
};

const Categories = ({ items }: CateogriesSearchType) => {
  return (
    <div className="">
      <button className="flex gap-x-3 py-3 overflow-x-auto w-full">
        {items.map((item) => (
          <CategoryItems
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        ))}
      </button>
    </div>
  );
};

export default Categories;
