import React from 'react'
import { CartStateItem, useCartStore } from '../store'
import { CreateCartItemValues } from '../services/dto/cart.dto'

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  addCartItem: (values: CreateCartItemValues) => void
  removeCartItem: (id: number) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(state => state)

  React.useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
