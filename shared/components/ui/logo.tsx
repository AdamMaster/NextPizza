import React from 'react'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link href={'/'} className={cn('flex gap-3 items-center', className)}>
      <Image src='/logo.png' alt='logo' width={35} height={32} />
      <div className='flex flex-col'>
        <div className='text-2xl uppercase font-black'>Next Pizza</div>
        <div className='text-gray-400 leading-3'>вкусней уже некуда</div>
      </div>
    </Link>
  )
}
