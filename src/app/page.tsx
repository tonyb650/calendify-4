// import prisma from "../../lib/prisma";
import LoginButton from "@/components/auth/LoginButton";
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
    <main className="flex h-full flex-col items-center justify-center bg-radial-[at_50%_00%] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-white text-7xl drop-shadow-md font-zain")}>
          📆 Calendify
        </h1>
        <p className="text-white text-lg">
          AI Powered Calendar Manager
        </p>
        <LoginButton mode="redirect">
          <Button >Sign In</Button>
        </LoginButton>



      </div>
    </main>
  );
}

        // <form
        //   action={createTodo}         
        //   >                               
        //   {/* <-- action prop in HTML lets you pass the URL you want to go to, */} 
        //   {/*	for example "/new/todo", but NextJS we can call a function that will run on the server (Next makes a fetch request) */}
        //   <input type="text" name="title" id="title"/>
        //   <button>Submit</button>
        // </form>