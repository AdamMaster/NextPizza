'use client'
import React from 'react'
import { useIntersection } from 'react-use'
import { Title } from './ui'
import { cn } from '@/shared/lib/utils'
import { ProductCard } from './product-card'
import { useCategoryStore } from '../store/useCategoryStore'

interface Props {
  title: string
  products: any[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({ title, products, categoryId, className, listClassName }) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  })

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='h2' className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product, i) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.variations[0].price}
            />
          )
        })}
      </div>
    </div>
  )
}
