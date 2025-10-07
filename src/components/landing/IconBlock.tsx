import { cn } from "@/lib/utils";
import React from "react";

const IconBlock = () => {
  return (
    <div
      className={cn(
        "text-6xl m-5  shadow-lg shadow-gray-800 rounded-lg w-24 h-24 flex justify-center items-center",
        "bg-radial-[at_00%_00%] from-white to-gray-200"
      )}
    >
      📆
    </div>
  );
};

export default IconBlock;
