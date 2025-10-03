"use client";

import { Button } from "@/components/ui/button";

const GuestLogin = () => {
  const handleClick = () => {
    console.log("Guest Login!")
  }
  return (
    <div className="flex items-center justify-center w-full ">
      <Button
        size="lg"
        className="flex"
        variant="secondary"
        onClick={() => handleClick()}
      >
        Try out as guest
      </Button>
    </div>
  );
};

export default GuestLogin;
