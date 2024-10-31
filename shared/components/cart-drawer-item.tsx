import React from 'react'
import { cn } from '../lib/utils'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
  className?: string
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemove?: () => void
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  className,
  onClickCountButton,
  onClickRemove
}) => {
  return (
    <div className={cn(className, 'flex bg-white p-5 gap-6')}>
      <CartItem.Image src={imageUrl} />
      <div className='flex-1'>
        <CartItem.Info name={name} details={details}></CartItem.Info>
        <hr className='my-3' />
        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}