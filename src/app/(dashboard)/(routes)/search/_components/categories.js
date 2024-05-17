"use client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcPuzzle,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

import { CategoryItem } from "./categ-item";

const iconMap = {
  Music: FcMusic,
  Games: FcPuzzle,
  Engineering: FcEngineering,
  Movies: FcFilmReel,
  Technology: FcMultipleDevices,
  Photography: FcOldTimeCamera,
  Sales: FcSalesPerformance,
  Sports: FcSportsMode,
  // Add more mappings as needed
};

export const Categories = ({ data }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {data.map((item) => (
        <CategoryItem
          key={item._id}
          label={item.name}
          icon={iconMap[item.name] || FcMusic} // Default icon if not found
          value={item._id}
        />
      ))}
    </div>
  );
};

