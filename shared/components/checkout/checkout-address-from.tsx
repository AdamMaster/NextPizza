import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormAddress, FormTextarea } from '../form'

interface Props {
  className?: string
}

export const CheckoutAddressFrom: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title='3. Адрес доставки'>
      <div className='flex flex-col gap-5'>
        <FormAddress name='address' />
        <FormTextarea className='text-base' name='comment' rows={5} placeholder='Комментарий к заказу' />
      </div>
    </WhiteBlock>
  )
}
