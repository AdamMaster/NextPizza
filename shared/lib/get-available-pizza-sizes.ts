import { ProductVariation } from '@prisma/client'
import { pizzaSizes, PizzaType } from '../constants/pizza'
import { Variant } from '../components/group-variants'

/**
 * Функция для получения списка доступных размеров пиц
 *
 * @param type
 * @param variations
 * @returns массив с объектами пицц {name: string, value: string, disabled: boolean}[]
 */

export const getAvailablePizzaSizes = (type: PizzaType, variations: ProductVariation[]): Variant[] => {
  const filteredPizzasByType = variations.filter(variation => variation.pizzaType === type)

  return pizzaSizes.map(pizzaSize => ({
    name: pizzaSize.name,
    value: pizzaSize.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(pizzaSize.value))
  }))
}
