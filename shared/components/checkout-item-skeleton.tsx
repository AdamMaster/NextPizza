import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
  className?: string
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className='flex items-center gap-5'>
        <div className='w-[60px] h-[60px] bg-muted rounded-full animate-pulse' />
        <h2 className='w-40 h-8 bg-muted rounded-[8px] animate-pulse' />
      </div>
      <div className='h-5 w-10 bg-muted rounded-[8px] animate-pulse' />
      <div className='h-8 w-[133px] bg-muted rounded-[8px] animate-pulse' />
    </div>
  )
}
