import React from 'react'
import { Ingredient } from '@prisma/client'
import { Api } from '@/shared/services/api-client'
import { useSet } from 'react-use'

interface ReturnProps {
  ingredientsData: Ingredient[]
  loading: boolean
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredientsData, setIngredientsData] = React.useState<Ingredient[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll()
        setIngredientsData(ingredients)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredientsData, loading }
}
