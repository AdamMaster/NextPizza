import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import React from 'react'

interface Props {
  orderId: number
  items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h2>Спасибо за покупку!</h2>
    <h3>Ваш заказ №{orderId} оплачен.</h3>
    <b>Список товаров:</b>
    <hr />
    <div className='grid gap-2'>
      {items.map(item => (
        <div key={item.id}>
          {item.productVariation.product.name} | {item.productVariation.price} ₽ x {item.quantity} шт. ={' '}
          {item.productVariation.price * item.quantity}
        </div>
      ))}
    </div>
  </div>
)
