import { cn } from '@/shared/lib/utils'
import React from 'react'
import { PizzaImage } from './pizza-image'
import { Button, Title } from './ui'
import { GroupVariants } from './group-variants'
import { PizzaSize, PizzaType, pizzaTypes } from '../constants/pizza'
import { Ingredient, ProductVariation } from '@prisma/client'
import { IngredientItem } from './ingredient-item'
import { getPizzaDetails } from '../lib'
import { usePizzaOptions } from '../hooks'

interface Props {
  className?: string
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variations: ProductVariation[]
  onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  variations,
  onClickAddCart
}) => {
  const { size, type, selectedIngredients, availablePizzaSizes, setSize, setType, addIngredient } =
    usePizzaOptions(variations)

  const { textDetails, totalPrice } = getPizzaDetails(size, type, variations, ingredients, selectedIngredients)

  const handleClickAdd = () => {
    onClickAddCart?.()
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className='w-[490px] bg-[#fcfcfc] p-7'>
        <Title text={name} size='h3' className='font-extrabold mb-1' />
        <p className='text-gray-400'>{textDetails}</p>
        <div className='flex flex-col gap-4 mt-5'>
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className='bg-gray-100 p-3 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
          <div className='grid grid-cols-3 gap-2'>
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button className='mt-10' onClick={handleClickAdd}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
