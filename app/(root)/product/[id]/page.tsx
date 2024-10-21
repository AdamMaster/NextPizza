import { Container, GroupVariants, ProductImage } from '@/shared/components'
import { Title } from '@/shared/components/ui'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return (
    <Container className='flex flex-col my-10 h-[500px]'>
      <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} size={20} />
        <div className='w-[490px] bg-[#fcfcfc] p-7'>
          <Title text={product.name} size='h2' className='font-extrabold bm-1' />
          <p className='text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eligendi perspiciatis minus ex.
          </p>
          <GroupVariants
            selectedValue='2'
            items={[
              {
                name: 'Маленькая',
                value: '1'
              },
              {
                name: 'Средняя',
                value: '2'
              },
              {
                name: 'Большая',
                value: '3',
                disabled: true
              }
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
