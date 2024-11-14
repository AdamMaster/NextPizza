import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { loginFormSchema, TLoginFormValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Title } from '@/shared/components/ui'
import Image from 'next/image'
import { FormInput } from '@/shared/components/form'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

interface Props {
  onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: TLoginFormValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (!resp?.ok) {
        throw new Error()
      }

      toast.success('Вы успешно вошли в аккаунт')

      onClose?.()
    } catch (error) {
      console.log('Error [LOGIN]', error)
      toast.error('Не удалось войти в аккаунт')
    }
  }

  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center'>
          <div className='mr-2'>
            <Title text='Вход в аккаунт' size='h3' className='font-bold' />
            <p className='text-gray-400'>Введите свою почту, чтобы войти в свой аккаунт</p>
            {/* <Image src='/phone-icon.png' alt='phone-icon' width={60} height={60} /> */}
          </div>
        </div>
        <FormInput name='email' label='E-Mail' required />
        <FormInput name='password' label='Пароль' type='password' required />
        <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
