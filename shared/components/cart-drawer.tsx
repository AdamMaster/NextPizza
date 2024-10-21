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
import { getCartItemsDetails } from '../lib'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className='font-bold'>3 товара</span>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-2 -mx-6 mt-5 overflow-auto scrollbar flex-1'>
            <CartDrawerItem
              id={1}
              imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
              details={getCartItemsDetails(2, 30, [{ name: 'Цыпленок' }, { name: 'Сыр' }])}
              name='Чоризо фреш'
              price={419}
              quantity={1}
            />
            <CartDrawerItem
              id={1}
              imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
              details={getCartItemsDetails(2, 30, [{ name: 'Цыпленок' }, { name: 'Сыр' }])}
              name='Чоризо фреш'
              price={419}
              quantity={1}
            />
            <CartDrawerItem
              id={1}
              imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
              details={getCartItemsDetails(2, 30, [{ name: 'Цыпленок' }, { name: 'Сыр' }])}
              name='Чоризо фреш'
              price={419}
              quantity={1}
            />
          </div>
          <SheetFooter className='-mx-6 bg-white p-8'>
            <div className='w-full'>
              <div className='flex mb-4'>
                <div className='flex flex-1 text-lg text-neutral-500'>
                  Итого
                  <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                  <span className='font-bold text-lg'>500 ₽</span>
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
