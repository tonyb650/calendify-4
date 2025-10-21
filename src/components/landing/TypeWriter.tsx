'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type TypewriterProps = {
  text: string
  delay?: number
  className?: string
}

const Typewriter = ({ text, delay = 100, className }: TypewriterProps) => {
  const [textPosition, setTextPosition] = useState(0)
  const [visibleText, setVisibleText] = useState(' ')

  const label = text.replace(/[|<]+/g, ' ')

  useEffect(() => {
    if (textPosition < text.length) {
      const timeout = setTimeout(() => {
        const char = text[textPosition]
        if (char !== '|') {
          setVisibleText((prev) =>
            char === '<'
              ? prev.substring(0, prev.length - 1)
              : prev + text[textPosition],
          )
        }
        setTextPosition((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [textPosition, delay, text.length])

  return (
    <div role="heading" aria-label={label} className={cn('flex', className)}>
      {visibleText}
      <div className="hidden lg:inline pulse w-1 h-[90%] mt-1 bg-foreground"></div>
    </div>
  )
}

export default Typewriter
