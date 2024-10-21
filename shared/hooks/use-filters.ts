'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import qs from 'qs'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  selectedTypes: string
  selectedSizes: string
  selectedIngredients: string
}

export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

  const [selectedSizes, { toggle: toggleSelectedSizes }] = useSet(
    new Set<string>(searchParams.has('selectedSizes') ? searchParams.get('selectedSizes')?.split(',') : [])
  )
  const [selectedTypes, { toggle: toggleSelectedTypes }] = useSet(
    new Set<string>(searchParams.has('selectedTypes') ? searchParams.get('selectedTypes')?.split(',') : [])
  )
  const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(
    new Set<string>(searchParams.has('selectedIngredients') ? searchParams.get('selectedIngredients')?.split(',') : [])
  )

  const [selectedPrices, setSelectedPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  })

  return {
    selectedSizes,
    toggleSelectedSizes,
    selectedTypes,
    toggleSelectedTypes,
    selectedIngredients,
    toggleSelectedIngredients,
    selectedPrices,
    setSelectedPrice
  }
}
