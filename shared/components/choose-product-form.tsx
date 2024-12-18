import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Button, Title } from './ui'

interface Props {
  className?: string
  imageUrl: string
  name: string
  price: number
  loading?: boolean
  onSubmit?: VoidFunction
}

/**
 * Форма выбора ПРОДУКТА
 */

export const ChooseProductForm: React.FC<Props> = ({ className, imageUrl, name, price, loading, onSubmit }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]'
        />
      </div>
      <div className='w-[490px] bg-[#fcfcfc] p-7'>
        <Title text={name} size='h3' className='font-extrabold mb-1' />
        <p className='text-gray-400'>Тут описание</p>
        <Button loading={loading} onClick={() => onSubmit?.()} className='mt-10 w-full'>
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
