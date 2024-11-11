import React from 'react'
import { RequiredSymbol } from '../required-symbol'
import { Input } from '../ui'
import { ErrorText } from '../error-text'
import { ClearButton } from '../clear-button'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressInput } from '../address-input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormAddress: React.FC<Props> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onCLickClear = () => {
    setValue(name, '', { shouldValidate: true })
  }

  return (
    <div className={className}>
      {label && (
        <p className='font-bold'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className='relative'>
        <Controller
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <>
              <AddressInput incomingValue={field.value} onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText className='mt-2' text={fieldState.error.message} />}
              {field.value && <ClearButton onClick={() => field.onChange('')} />}
            </>
          )}
        />
      </div>
    </div>
  )
}
