import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
  query?: string
  sortBy?: string
  selectedSizes?: string
  selectedTypes?: string
  selectedIngredients?: string
  priceFrom?: string
  priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
  const pizzaSizes = params.selectedSizes?.split(',').map(Number)
  const pizzaTypes = params.selectedTypes?.split(',').map(Number)
  const ingredientsIdArr = params.selectedIngredients?.split(',').map(Number)

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc'
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr
                  }
                }
              }
            : undefined,
          variations: {
            some: {
              size: {
                in: pizzaSizes
              },
              pizzaType: {
                in: pizzaTypes
              },
              price: {
                gte: minPrice,
                lte: maxPrice
              }
            }
          }
        },
        include: {
          ingredients: true,
          variations: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice
              }
            },
            orderBy: {
              price: 'asc'
            }
          }
        }
      }
    }
  })

  return categories
}
