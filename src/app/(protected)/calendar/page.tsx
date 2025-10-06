import { getEvents } from "@/db/events";
import { Suspense } from "react";
import CalendarView from "./_components/CalendarView";

export default function Home() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <CalendarPage />
    </Suspense>
  );
}

async function CalendarPage() {
  const events = await getEvents()

  return (
    <div className="mx-2 md:mx-3">
      <CalendarView events={events} />
    </div>
  ) 
}
