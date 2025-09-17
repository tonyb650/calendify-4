'use client'

import prisma from "../../lib/prisma";

export default function Home() {

  const handleClick = async () => {
    console.log("attempting prisma call")
    await prisma.verificationToken.create({data: {identifier: "1", token: "1", expires: new Date()}})
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button onClick={handleClick}>Prisma Now!</button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
