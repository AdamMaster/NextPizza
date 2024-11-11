'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ProductWithRelations } from '@/@types/prisma'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ProductForm } from '../product-form'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
        <DialogTitle hidden />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
