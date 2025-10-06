import { TriangleAlertIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

const GuestModeWarning = () => {
  const session = useSession()
  console.log(session.data)
  if (!session.data?.user.isGuest) return null

  return (
    <div className='bg-amber-500 rounded px-2 py-0.5 text-xs flex flex-col items-center'>
      <span className='hidden sm:block font-bold'>Guest Mode</span>
      <span className='hidden sm:block'>Data will not be saved</span>
      <TriangleAlertIcon className='sm:hidden'/>
    </div>
  )
}

export default GuestModeWarning