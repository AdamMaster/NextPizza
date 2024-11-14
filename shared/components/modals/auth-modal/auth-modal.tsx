import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@/shared/components/ui'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { LoginForm } from './forms/login-form'

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ className, open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login')
  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className='w-[450px] bg-white p-10'>
        {type === 'login' ? <LoginForm onClose={handleClose} /> : 'Register'}
        <hr />
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            onClick={() => signIn('github', { callbackUrl: '/', redirect: true })}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <Image className='h-[31px] w-[30px]' src='github-icon.svg' width={30} height={31} alt='favicon' />
            Github
          </Button>

          <Button
            variant='secondary'
            onClick={() => signIn('google', { callbackUrl: '/', redirect: true })}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <Image className='h-[31px] w-[30px]' src='google-icon.svg' width={30} height={31} alt='favicon' />
            Google
          </Button>
        </div>
        <Button variant='outline' onClick={onSwitchType} type='button' className='h-12'>
          {type === 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
