'use client'
import React from 'react'
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { cn } from '../lib/utils'

interface Props {
  className?: string
  onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ className, onChange }) => {
  const handleChange = (value: any) => {
    onChange?.(value)
  }

  return (
    <AddressSuggestions token='711379c9b85d74e336ec484c00a144a50cbad692' onChange={data => handleChange(data?.value)} />
  )
}
