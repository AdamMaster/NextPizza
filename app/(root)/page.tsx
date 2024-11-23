import { Container, Filters, ProductsGroupList, Stories, TopBar } from '@/shared/components'
import { Title } from '@/shared/components/ui'
import { Suspense } from 'react'
import { findPizzas, GetSearchParams } from '@/shared/services/find-pizzas'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className='mt-6'>
        <Title text='Все пиццы' size='h2' className='font-extrabold' />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Stories />
      <Container className='pb-14 mt-10'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
