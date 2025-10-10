import LoginButton from "@/components/auth/LoginButton";
import ApptFolderArt from "@/components/landing/ApptFolderArt";
import DotCard from "@/components/landing/DotCard";
import Icon from "@/components/landing/Icon";
import IconBlock from "@/components/landing/IconBlock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export default function Home() {
  // async function createTodo(formData: FormData) {
  //   "use server"
  //   // This code is being called only on the server
  //   //console.log(formData)               // Will log form data on the server console
  //   //console.log(formData.get("title"))
  //   // ... await async database 'create' action here
  //   await prisma.verificationToken.create({data:{id: "1", expires: new Date(), token: "1", email: "hey@hey.com"}})
  // }

  return (
    <main
      className={cn(
        "h-full flex justify-center",
        "bg-radial-[at_50%_00%] from-sky-400 to-blue-800"
      )}
    >
      <div className="w-full max-w-7xl mx-3 sm:mx-6 md:mx-12">
        <nav className="h-12 flex justify-between items-center mx-3">
          <div className="text-white text-4xl font-zain flex items-center gap-3 mt-0.5">
            <Icon className="mb-1.5" /> Calendify
          </div>
          <LoginButton mode="redirect">
            <Button variant="secondary" className="bg-white">
              Sign In
            </Button>
          </LoginButton>
        </nav>
        <DotCard className="relative overflow-clip">
          <ApptFolderArt className="hidden sm:block sm:absolute -right-20 top-10 sm:-rotate-12" />
          <div className="space-y-4 text-gray-900 flex flex-col align-center items-center ">
            <IconBlock />
            <h1 className="text-5xl mt-6 mb-12 text-center">
              A smarter way to plan your day
            </h1>
            <h2 className={cn("text-7xl drop-shadow-md font-zain")}>
              Calendify
            </h2>
            <p className="text-lg">AI Powered Calendar Manager</p>
            <LoginButton mode="redirect">
              <Button>Sign In</Button>
            </LoginButton>
          </div>
        </DotCard>
      </div>
    </main>
  );
}

