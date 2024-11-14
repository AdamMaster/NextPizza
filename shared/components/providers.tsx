'use client'
import React, { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </Fragment>
  )
}
