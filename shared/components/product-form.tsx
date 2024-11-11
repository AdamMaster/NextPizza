'use client'
import React from 'react'
import { useCartStore } from '../store'
import toast from 'react-hot-toast'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

interface Props {
  product: ProductWithRelations
  onSubmit?: VoidFunction
  className?: string
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const firstItem = product.variations[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const addCartItem = useCartStore(state => state.addCartItem)
  const loading = useCartStore(state => state.loading)

  const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariationId ?? firstItem.id

      await addCartItem({
        productVariationId: itemId,
        ingredients
      })

      toast.success(`${product.name} добавлена в корзину`)
      _onSubmit?.()
    } catch (err) {
      toast.error(`Не удалось добавить товар в корзину`)
      console.error(err)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variations={product.variations}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  )
}
