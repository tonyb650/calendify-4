"use client";

import { createEventAction, updateEventAction } from "@/actions/events";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventWithParts } from "@/db/events";
import { EventColor } from "@/generated/prisma";
import combinedDuration from "@/helpers/combinedDuration";
import {
  formatDate,
  formatTime,
  getEndTime,
  getNextHourStart
} from "@/lib/dateUtils";
import { useActionState, useEffect, useState } from "react";

//! move to user preferences
const USER_PREFERENCE_DEFAULT_APPOINTMENT_DURATION = 30; // default to 30 minutes if no duration is provided

type EventFormProps = {
  onSuccess: () => void;
  event?: EventWithParts;
  defaultDate?: Date;
};

/* event will be passed in when Updating but not when Creating */
export default function EventForm({
  event,
  defaultDate,
  onSuccess
}: EventFormProps) {
  /* useActionState has three parameters
    1) our function that will be called by the returned formAction function
    2) the previous state of our 'response' (here is type of: EventActionResponse)
    3) optionally permalink
  */
  const [response, formAction, isPending] = useActionState(
    event ? updateEventAction : createEventAction,
    { data: event }
  );
  // TODO: Will need to make StartTime & EndTime controlled because EndTime should be automatically shifted later (or earlier) when startTime is changed
  const [autoSchedule, setAutoSchedule] = useState(
    event ? !event.isAppointment : true
  );

  // console.log(event, "EventForm event prop");

  useEffect(() => {
    if (response.success) {
      onSuccess();
    }
  }, [response, onSuccess]);

  const earliestPart = event?.parts?.sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  )[0];
  const startDate = earliestPart?.start
    ? new Date(earliestPart.start)
    : defaultDate || getNextHourStart(new Date());
  const duration: number | undefined =
    combinedDuration(event?.parts) ||
    USER_PREFERENCE_DEFAULT_APPOINTMENT_DURATION;
  const endTime = formatTime(getEndTime(startDate, duration));

  return (
    <form action={formAction} className="form">
      <FieldSet>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            required
            type="text"
            name="title"
            id="title"
            defaultValue={event?.title}
          />
        </Field>



        <Field orientation="horizontal">
          <Checkbox
            id="autoSchedule"
            name="autoSchedule"
            checked={autoSchedule}
            onCheckedChange={() => setAutoSchedule((prev) => !prev)}
          />
          <FieldLabel htmlFor="autoSchedule">Auto Schedule</FieldLabel>
        </Field>

        <Field>
          <FieldLabel htmlFor="startDate">
            {autoSchedule && "Start"} Date
          </FieldLabel>
          <Input
            required
            type="date"
            name="startDate"
            id="startDate"
            defaultValue={formatDate(startDate)}
          />
        </Field>

        {autoSchedule && (
          <>
            <Field>
              <FieldLabel htmlFor="duration">Duration (minutes)</FieldLabel>
              <Input
                required
                type="number"
                name="duration"
                id="duration"
                defaultValue={duration}
              />
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="isBreakable"
                name="isBreakable"
                checked={autoSchedule}
                defaultChecked={event?.isBreakable || false}
              />
              <FieldLabel htmlFor="isBreakable">Breakable</FieldLabel>
            </Field>
          </>
        )}
        {!autoSchedule && (
          <>
            <Field>
              <FieldLabel htmlFor="start">Start Time</FieldLabel>
              <Input
                required
                type="time"
                name="startTime"
                id="startTime"
                defaultValue={formatTime(startDate)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="end">End Time</FieldLabel>
              <Input
                required
                type="time"
                name="endTime"
                id="endTime"
                defaultValue={endTime}
              />
            </Field>
          </>
        )}
        {/* Replace this with "choice chips" */}
        <Field>
          <Select name="color" defaultValue={event?.color || "White"}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Color</SelectLabel>
                {Object.values(EventColor).map((color, i) => (
                  <SelectItem key={i} value={color}>
                    <span className={ color !== "White" ? `text-[${color}]`:""}>{color}</span>
                    </SelectItem>
                  
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Button variant="default">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </FieldSet>
    </form>
  );
}
