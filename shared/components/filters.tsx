'use client'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Input, Title } from './ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import qs from 'qs'
import { useRouter } from 'next/navigation'
import { useFilters, useFilterIngredients } from '@/shared/hooks'

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  selectedTypes: string
  selectedSizes: string
  selectedIngredients: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    selectedSizes,
    toggleSelectedSizes,
    selectedTypes,
    toggleSelectedTypes,
    selectedIngredients,
    toggleSelectedIngredients,
    selectedPrices,
    setSelectedPrice
  } = useFilters()

  const { ingredientsData, loading } = useFilterIngredients()
  const ingredientItems = ingredientsData.map(item => ({ value: String(item.id), text: item.name }))

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setSelectedPrice({
      ...selectedPrices,
      [name]: value
    })
  }

  const router = useRouter()

  React.useEffect(() => {
    const params = {
      ...selectedPrices,
      selectedTypes: Array.from(selectedTypes),
      selectedSizes: Array.from(selectedSizes),
      selectedIngredients: Array.from(selectedIngredients)
    }

    const query = qs.stringify(params, {
      arrayFormat: 'comma'
    })

    router.push(`?${query}`, {
      scroll: false
    })
  }, [selectedTypes, selectedSizes, selectedPrices, selectedIngredients])

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='h3' className='mb-5 font-bold' />
      <CheckboxFiltersGroup
        title='Тип теста'
        name='pizza-types'
        className='mb-5'
        onCLickCheckbox={toggleSelectedTypes}
        selectedValues={selectedTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' }
        ]}
      />
      <CheckboxFiltersGroup
        title='Размеры'
        name='pizza-sizes'
        className='mb-5'
        onCLickCheckbox={toggleSelectedSizes}
        selectedValues={selectedSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' }
        ]}
      />
      <div className='mt-5 border-y border-y-neutral-100 py-6 pb7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(selectedPrices.priceFrom)}
            onChange={e => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(selectedPrices.priceTo)}
            onChange={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[selectedPrices.priceFrom || 0, selectedPrices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setSelectedPrice({ priceFrom, priceTo })}
        />
      </div>
      <CheckboxFiltersGroup
        title='Ингредиенты'
        className='mt-5'
        limit={6}
        defaultItems={ingredientItems.slice(0, 6)}
        items={ingredientItems}
        loading={loading}
        onCLickCheckbox={toggleSelectedIngredients}
        selectedValues={selectedIngredients}
        name='ingredients'
      />
    </div>
  )
}
