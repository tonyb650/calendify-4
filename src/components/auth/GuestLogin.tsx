"use client";

import { registerGuest } from "@/actions/registerGuest";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const GuestLogin = () => {
  const [isPending, startTransition] = useTransition()
  // const [error, setError] = useState<string | undefined>()
  // const [success, setSuccess] = useState<string | undefined>()
  const router = useRouter()

  const handleGuestLogin = async () => {
    // setSuccess(undefined)
    // setError(undefined)
    startTransition(async () => {
      await registerGuest()
      // setError(data.error)
      // setSuccess(data.success)
      // if (!localStorage.getItem("guestId") && data.id) {
      //   localStorage.setItem("guestId", data.id);
      // }
      
    })
    // const guestId = localStorage.getItem("guestId");
    // console.log("PUSH<<<<<<<<<<<<<<<<<<<")
    router.push('/calendar')
  }

  return (
    <div className="flex items-center justify-center w-full ">
      <Button
        size="lg"
        className="flex"
        variant="secondary"
        onClick={handleGuestLogin}
        disabled={isPending}
      >
        { isPending ? "Setting up guest account..." : "Try out as guest"}
      </Button>
    </div>
  );
};

export default GuestLogin;
