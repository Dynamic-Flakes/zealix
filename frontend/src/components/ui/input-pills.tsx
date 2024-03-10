import * as React from 'react'

import { cn } from '@/utils/cn'

export interface InputPillsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  pills: string[]
  onPillRemove: (pill: string) => void
}

const InputPills: React.FC<InputPillsProps> = ({ pills, onPillRemove, ...props }) => {
  const handlePillRemove = (pill: string) => {
    onPillRemove(pill)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill, index) => (
        <div key={index} className="flex items-center rounded-full bg-gray-200 px-2 py-1">
          <span className="mr-1">{pill}</span>
          <button
            type="button"
            onClick={() => handlePillRemove(pill)}
            className="flex h-4 w-4 items-center justify-center border-none bg-transparent text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className={cn(
          'flex-auto rounded border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.className,
        )}
        {...props}
      />
    </div>
  )
}

InputPills.displayName = 'InputPills'

export { InputPills }
