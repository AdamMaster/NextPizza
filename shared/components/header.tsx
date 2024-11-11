import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Button, Logo } from './ui'
import { CartButton, Container, SearchInput } from '.'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <Logo />
        <div className='mx-10 flex-1'>{hasSearch && <SearchInput />}</div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' className='flex items-center gap-3'>
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
