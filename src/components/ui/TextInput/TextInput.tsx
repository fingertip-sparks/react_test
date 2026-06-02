import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  required?: boolean
  invalid?: boolean
  id: string
  type: 'text' | 'email' | 'password'
  errorText?: string
}

export function TextInput({ id, label, invalid, errorText, ...props }: TextInputProps) {
  const errorId = errorText ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={invalid ? 'true' : 'false'} aria-describedby={errorId} {...props} />
      {errorText && <p id={`${id}-error`}>{errorText}</p>}
    </div>
  )
}
