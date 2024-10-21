import { Container, Filters, ProductsGroupList, TopBar } from '@/shared/components'
import { Title } from '@/shared/components/ui'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variations: true
        }
      }
    }
  })

  return (
    <>
      <Container className='mt-6'>
        <Title text='Все пиццы' size='h2' className='font-extrabold' />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className='pb-14 mt-10'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
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
