import { updateUserSettingsAction } from '@/actions/users'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useSession } from 'next-auth/react'
import { useActionState, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { DEFAULT_EARLIEST_TIME, DEFAULT_LATEST_TIME } from '@/constants'
import { FieldLabel, FieldSet } from '../ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

/* TIME_OPTIONS is for the dropdowns. Array of options that look like: { value: 0, label: "12:00 AM" } */
const TIME_OPTIONS = Array(48)
  .fill(null)
  .map((_, i) => {
    let hour = String(Math.floor(i / 2) % 12).padStart(2, '0')
    if (hour === '00') hour = '12' // Convert 0 to 12 for AM/PM format
    const minute = i % 2 === 0 ? '00' : '30'
    return { value: i, label: `${hour}:${minute} ${i < 24 ? 'AM' : 'PM'}` }
  })

type UserSettingsFormProps = {
  onClose: () => void
}

const UserSettingsForm = ({ onClose }: UserSettingsFormProps) => {
  const user = useCurrentUser()
  const { update } = useSession()
  const [earliest, setEarliest] = useState<number>(
    user?.earliest || DEFAULT_EARLIEST_TIME,
  )
  const [latest, setLatest] = useState<number>(
    user?.latest || DEFAULT_LATEST_TIME,
  )

  /* useActionState has three parameters
  1) our function that will be called by the returned formAction function
  2) the previous state of our 'response' (here is type of: UserActionResponse)
  3) optionally permalink
  */
  // (alias) function updateEventAction(prevState: UserActionResponse, formData: FormData): Promise<UserActionResponse>

  const [response, formAction, isPending] = useActionState(
    updateUserSettingsAction,
    {},
  )

  useEffect(() => {
    const updateSession = async () => {
      await update() // <-- Sync session with DB after successful DB update
    }
    if (response.success) {
      updateSession()
      onClose()
    }
  }, [response, onClose, update])

  return (
    <form action={formAction} className="space-y-8">
      <FieldSet className="gap-1">
        <FieldLabel htmlFor="earliest">Earliest Start:</FieldLabel>
        <Select
          name="earliest"
          value={String(earliest)}
          onValueChange={(val) => setEarliest(Number(val))}
        >
          <SelectTrigger>
            <SelectValue aria-label={TIME_OPTIONS[earliest].label}>
              {TIME_OPTIONS[earliest].label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldSet>

      <FieldSet className="gap-1">
        <FieldLabel htmlFor="latest">Latest End:</FieldLabel>
        <Select
          name="latest"
          value={String(latest)}
          onValueChange={(val) => setLatest(Number(val))}
        >
          <SelectTrigger>
            <SelectValue aria-label={TIME_OPTIONS[latest].label}>
              {TIME_OPTIONS[latest].label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldSet>

      <div className="flex justify-end gap-4">
        <Button type="button" variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{isPending ? 'Updating...' : 'Update'}</Button>
      </div>
    </form>
  )
}

export default UserSettingsForm
