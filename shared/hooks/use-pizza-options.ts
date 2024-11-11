'use client'
import React from 'react'
import { PizzaSize, PizzaType } from '../constants/pizza'
import { ProductVariation } from '@prisma/client'
import { Variant } from '../components/group-variants'
import { useSet } from 'react-use'
import { getAvailablePizzaSizes } from '../lib'

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  availablePizzaSizes: Variant[]
  currentVariationId?: number
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  addIngredient: (id: number) => void
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const availablePizzaSizes = getAvailablePizzaSizes(type, variations)

  const currentVariationId = variations.find(item => item.pizzaType === type && item.size === size)?.id

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled)
    const availablePizzaSize = availablePizzaSizes?.find(item => !item.disabled)

    if (!isAvailableSize && availablePizzaSize) {
      setSize(Number(availablePizzaSize.value) as PizzaSize)
    }
  }, [availablePizzaSizes, size])

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentVariationId,
    setSize,
    setType,
    addIngredient
  }
}
