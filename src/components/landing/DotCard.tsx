import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const DotCard = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "h-[calc(100vh-72px)]  flex flex-col justify-around",
        "rounded-2xl border-gray-400 border-2 shadow-md",
        className
      )}
      style={{
        backgroundColor: "#f0f0f0",
        backgroundImage:
          "radial-gradient(circle at center, #DDD 2px, transparent 0)",
        backgroundSize: "9px 9px"
      }}
    >
      {children}
    </div>
  );
};

export default DotCard;
