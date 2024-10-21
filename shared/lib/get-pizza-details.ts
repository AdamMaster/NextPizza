import { Ingredient, ProductVariation } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza'
import { calcTotalPizzaPrice } from './calc-total-pizza-price'

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(size, type, variations, ingredients, selectedIngredients)
  const textDetails = `${size} см, ${mapPizzaType[type].toLocaleLowerCase()} пицца`

  return { totalPrice, textDetails }
}
