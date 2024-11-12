'use server'
import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormValues } from '@/shared/constants'
import { OrderStatus, Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { calcOrderPrice, createPayment, sendEmail } from '@/shared/lib'
import { PayOrderTemplate } from '@/shared/components'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies()
    const cartToken = cookiesStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariation: {
              include: {
                product: true
              }
            }
          }
        }
      },
      where: {
        token: cartToken
      }
    })

    // Если корзина не найдена возвращаем ошибку
    if (!userCart) {
      throw new Error('Cart not found')
    }

    // Если корзина пустая возвращаем ошибку
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    // Создается заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: calcOrderPrice(userCart.totalAmount),
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items)
      }
    })

    // Очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: `Оплата заказа №${order.id}`
    })

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        paymentId: paymentData.id
      }
    })

    const paymentUrl = paymentData.confirmation.confirmation_url

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl
      })
    )

    return paymentUrl
  } catch (error) {
    console.log('[CreateOrder] Server error', error)
  }
}
