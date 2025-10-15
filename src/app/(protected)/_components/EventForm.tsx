'use client'

import { createEventAction, updateEventAction } from '@/actions/events'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { EventWithParts } from '@/db/events'
import { EventColor } from '@/generated/prisma'
import combinedDuration from '@/helpers/combinedDuration'
import {
  formatDate,
  formatTime,
  getEndTime,
  getNextHourStart,
} from '@/lib/dateUtils'
import { cn } from '@/lib/utils'
import { useActionState, useEffect, useState } from 'react'

//! move to user preferences
const USER_PREFERENCE_DEFAULT_APPOINTMENT_DURATION = 30 // default to 30 minutes if no duration is provided

type EventFormProps = {
  onSuccess: () => void
  onCancel: () => void
  event?: EventWithParts
  defaultDate?: Date
}

/* event will be passed in when Updating but not when Creating */
export default function EventForm({
  event,
  defaultDate,
  onSuccess,
  onCancel,
}: EventFormProps) {
  /* useActionState has three parameters
    1) our function that will be called by the returned formAction function
    2) the previous state of our 'response' (here is type of: EventActionResponse)
    3) optionally permalink
  */
  const [response, formAction, isPending] = useActionState(
    event ? updateEventAction : createEventAction,
    { data: event },
  )
  // TODO: Will need to make StartTime & EndTime controlled because EndTime should be automatically shifted later (or earlier) when startTime is changed
  const [autoSchedule, setAutoSchedule] = useState(
    event ? !event.isAppointment : true,
  )

  // console.log(event, "EventForm event prop");

  useEffect(() => {
    if (response.success) {
      onSuccess()
    }
  }, [response, onSuccess])

  const earliestPart = event?.parts?.sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  )[0]
  const startDate = earliestPart?.start
    ? new Date(earliestPart.start)
    : defaultDate || getNextHourStart(new Date())
  const duration: number | undefined =
    combinedDuration(event?.parts) ||
    USER_PREFERENCE_DEFAULT_APPOINTMENT_DURATION
  const endTime = formatTime(getEndTime(startDate, duration))

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
            {autoSchedule && 'Start'} Date
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
        <Field orientation="horizontal">
          {Object.values(EventColor).map((color, i) => (
            <FieldLabel key={i} className={cn(' cursor-pointer ')}>
              <Input
                type="radio"
                name="color"
                value={color}
                className="peer sr-only"
                defaultChecked={color === event?.color || color === 'White'}
                aria-label={`${color} color`}
              />
              <span
                className={cn(
                  'px-4 py-1.5 rounded-full border border-gray-300 w-14 h-5',
                  ' peer-checked:border-2 peer-checked:scale-125 peer-checked:border-gray-600 transition-all duration-200',
                )}
                style={{ background: `${color}` }}
              ></span>
            </FieldLabel>
          ))}
        </Field>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default">
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </FieldSet>
    </form>
  )
}
