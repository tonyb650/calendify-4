import React from "react";
import Icon from "./landing/Icon";
import { cn } from "@/lib/utils";

const CalendifyLogo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "text-4xl font-semibold font-zain flex items-center gap-3 mt-0.5",
        className
      )}
    >
      <Icon className="mb-1.5" /> Calendify
    </div>
  );
};

export default CalendifyLogo;
