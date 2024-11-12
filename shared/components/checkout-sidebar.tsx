import React from 'react'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { Button, Skeleton } from './ui'
import { WhiteBlock } from './white-block'
import { calcOrderPrice } from '../lib'
import { deliveryPrice, vat } from '../constants'
import { useCartStore } from '../store'

interface Props {
  totalAmount: number
  loading: boolean
  className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const vatPrice = (totalAmount * vat) / 100
  const totalPrice = totalAmount + deliveryPrice + vatPrice
  const { items } = useCartStore()

  return (
    <WhiteBlock className='p-6 sticky top-4'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итого:</span>
        {loading ? (
          <Skeleton className='w-48 h-10 rounded-[8px]' />
        ) : (
          <span className='text-[34px] font-extrabold leading-10'>
            {items.length > 0 ? calcOrderPrice(totalAmount) : 0} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Package size={18} className='mr-2 text-gray-300' />
            Стоимость:
          </div>
        }
        value={loading ? <Skeleton className='w-14 h-7 rounded-[8px]' /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Percent size={18} className='mr-2 text-gray-300' />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className='w-14 h-7 rounded-[8px]' /> : `${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Truck size={18} className='mr-2 text-gray-300' />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className='w-14 h-7 rounded-[8px]' /> : `${deliveryPrice} ₽`}
      />
      <Button loading={loading} className='w-full h-14 rounded-2xl mt-6 text-base font-bold' type='submit'>
        Перейти к оплате
        <ArrowRight className='w-5 ml-2' />
      </Button>
    </WhiteBlock>
  )
}
