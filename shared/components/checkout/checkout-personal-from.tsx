import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

interface Props {
  className?: string
}

export const CheckoutPersonalFrom: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title='2. Персональные данные'>
      <div className='grid grid-cols-2 gap-5'>
        <FormInput className='text-base' name='firstName' label='Имя' />
        <FormInput className='text-base' name='lastName' label='Фамилия' />
        <FormInput className='text-base' name='email' label='E-Mail' />
        <FormInput className='text-base' name='phone' label='Телефон' />
      </div>
    </WhiteBlock>
  )
}
