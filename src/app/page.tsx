import prisma from "../../lib/prisma";

export default function Home() {

  async function createTodo(formData: FormData) { 
    "use server"
    // This code is being called only on the server
    console.log(formData)               // Will log form data on the server console
    console.log(formData.get("title")) 
    // ... await async database 'create' action here
    await prisma.verificationToken.create({data:{identifier: "2", expires: new Date(), token: "3"}})
  }
  
	return (
		<form
			action={createTodo}         
      >                               
      {/* <-- action prop in HTML lets you pass the URL you want to go to, */} 
      {/*	for example "/new/todo", but NextJS we can call a function that will run on the server (Next makes a fetch request) */}
			<input type="text" name="title" id="title"/>
			<button>Submit</button>
		</form>
	)
}


