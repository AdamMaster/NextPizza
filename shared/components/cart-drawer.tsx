'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet'
import Link from 'next/link'
import { Button } from './ui'
import { ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '../lib'
import { useCartStore } from '../store'
import { PizzaSize, PizzaType } from '../constants/pizza'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const items = useCartStore(state => state.items)
  const totalAmount = useCartStore(state => state.totalAmount)
  const fetchCartItems = useCartStore(state => state.fetchCartItems)
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
  const removeCartItem = useCartStore(state => state.removeCartItem)

  React.useEffect(() => {
    fetchCartItems()
  }, [])

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onCLickRemove = (id: number) => {
    removeCartItem(id)
  }

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className='font-bold'>{items.length} товаров</span>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-2 -mx-6 mt-5 overflow-auto scrollbar flex-1'>
            {items.map(item => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => onCLickRemove(item.id)}
              />
            ))}
          </div>
          <SheetFooter className='-mx-6 bg-white p-8'>
            <div className='w-full'>
              <div className='flex mb-4'>
                <div className='flex flex-1 text-lg text-neutral-500'>
                  Итого
                  <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                  <span className='font-bold text-lg'>{totalAmount} ₽</span>
                </div>
              </div>
              <Link href={'/cart'}>
                <Button type='submit' className='w-full h-12 text-base'>
                  Оформить заказ
                  <ArrowRight className='w-5 ml-2' />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}