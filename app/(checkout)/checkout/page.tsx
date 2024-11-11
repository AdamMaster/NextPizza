'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutSidebar, Container } from '@/shared/components'
import { Title } from '@/shared/components/ui'
import { useCart } from '@/shared/hooks'
import { CheckoutAddressFrom, CheckoutCart, CheckoutPersonalFrom } from '@/shared/components/checkout'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: ''
    }
  })

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data)
  }

  return (
    <Container className='mt-10'>
      <Title className='font-extrabold mb-8' text='Оформление заказа' size='h2' />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-[1fr_450px] gap-10'>
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutCart
                items={items}
                loading={loading}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalFrom className={`${loading && 'opacity-40 pointer-events-none'}`} />
              <CheckoutAddressFrom className={`${loading && 'opacity-40 pointer-events-none'}`} />
            </div>
            <div>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
