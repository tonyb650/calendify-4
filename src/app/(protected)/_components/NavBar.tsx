'use client'

import CalendifyLogo from "@/components/CalendifyLogo"
import UserButton from "@/components/user/UserButton"
import AddEventButton from "./AddEventButton"
import { cn } from "@/lib/utils"
import GuestModeWarning from "./GuestModeWarning"

const Navbar = () => {
  return (
    <div className={cn("text-white shadow-md sticky top-0 z-10", "bg-radial-[at_25%_00%] from-sky-600 to-blue-800")}>
      <nav className="flex justify-between items-center mb-5 px-5 py-3 max-w-7xl mx-auto">
        <CalendifyLogo/>
        <div className="flex items-center gap-x-3">
          <GuestModeWarning/>
          <AddEventButton/>
          <UserButton/>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
