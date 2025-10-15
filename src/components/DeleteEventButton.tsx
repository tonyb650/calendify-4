import { deleteEventAction } from '@/actions/events'
import { Event } from '@/generated/prisma'
import { useActionState, useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

// TODO Improve styling!

export function DeleteEventButton({
  event,
  onSuccess,
}: {
  event?: Event
  onSuccess: () => void
}) {
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [response, formAction, isPending] = useActionState(deleteEventAction, {
    data: event,
  })

  useEffect(() => {
    if (response.success) {
      onSuccess()
    }
  }, [response, onSuccess])

  if (!event) return null

  return (
    <Dialog open={confirmIsOpen} onOpenChange={setConfirmIsOpen}>
      <DialogTrigger className="rounded-full bg-white text-blue-700 px-2 mr-4 cursor-pointer hover:text-red-700">
        <RiDeleteBin5Line className="" />
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-white rounded-lg p-10 shadow-lg space-y-2">
        <DialogTitle className="text-2xl font-bold flex justify-between gap-4">
          Delete Event
        </DialogTitle>
        <p>Are you sure you want to delete this event:</p>
        <p className="text-sm font-semibold">{event.title}</p>

        <form action={formAction} className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setConfirmIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive">
            {isPending ? 'Deleting...' : 'Confirm'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
