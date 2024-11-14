'use client'
import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Logo } from './ui'
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '.'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  React.useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
        router?.push('/')
      }, 500)
    }
  }, [])

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <Logo />
        <div className='mx-10 flex-1'>{hasSearch && <SearchInput />}</div>
        <div className='flex items-center gap-3'>
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
