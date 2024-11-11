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
import { Button, Title } from './ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '../lib'
import { useCartStore } from '../store'
import { PizzaSize, PizzaType } from '../constants/pizza'
import Image from 'next/image'
import { useCart } from '../hooks'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const { totalAmount, items, updateItemQuantity, addCartItem, removeCartItem } = useCart()
  const [redirecting, setRedirecting] = React.useState(false)

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине <span className='font-bold'>{items.length} товаров</span>
              </SheetTitle>
            </SheetHeader>
          )}
          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 m-auto translate-y-[-1.5rem]'>
              <Image src='/empty-box.png' alt='Empty-cart' width={120} height={120} />
              <Title size='h3' text='Корзина пустая' className='text-center font-bold my-2' />
              <p className='text-center text-neutral-500 mb-5'>Добавьте хотябы один товар, чтобы совершить заказ</p>
              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}
          {totalAmount > 0 && (
            <>
              <div className='flex flex-col gap-2 -mx-6 mt-5 overflow-auto scrollbar flex-1'>
                {items.map(item => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
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
                  <Link href={'/checkout'}>
                    <Button
                      className='w-full h-12 text-base'
                      type='submit'
                      loading={redirecting}
                      onClick={() => setRedirecting(true)}
                    >
                      Оформить заказ
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
