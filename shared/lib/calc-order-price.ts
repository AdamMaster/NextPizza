import { deliveryPrice, vat } from '../constants'

/**
 * Функция для подсчета финальной стоимости заказа
 *
 * @example ``` calcOrderPrice(totalPrice) ```
 *
 * @param totalAmount - общая цена всех товаров в корзине
 * @returns - общая стоимость с учетом доставки и налога
 */

export const calcOrderPrice = (totalAmount: number) => {
  const vatPrice = (totalAmount * vat) / 100
  const totalPrice = totalAmount + deliveryPrice + vatPrice

  return totalPrice
}
