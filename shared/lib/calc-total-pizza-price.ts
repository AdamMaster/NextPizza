import { Ingredient, ProductVariation } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @example ``` calcTotalPizzaPrice(20, 1, variations, ingredients, selectedIngredients ) ```
 *
 * @param size - размер выбранной пиццы
 * @param type - типа теста выбранной пиццы
 * @param variations - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns - общая стоимость
 */

export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = variations.find(variation => variation.pizzaType === type && variation.size === size)?.price || 0
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + totalIngredientsPrice
}
