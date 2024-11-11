import React from 'react'
import { WhiteBlock } from '../white-block'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/store'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib'
import { CheckoutItemSkeleton } from '../checkout-item-skeleton'

interface Props {
  className?: string
  items: CartStateItem[]
  loading?: boolean
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
  removeCartItem: (id: number) => void
}

export const CheckoutCart: React.FC<Props> = ({ className, items, loading, onClickCountButton, removeCartItem }) => {
  return (
    <WhiteBlock className={className} title='1. Корзина'>
      <div className='flex flex-col gap-5'>
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map(item => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  )
}
