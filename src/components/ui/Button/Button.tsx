import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({ variant = 'primary', size = 'medium', isLoading = false, disabled, children, className, ...props }: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')} disabled={isDisabled} aria-disabled={isDisabled} aria-busy={isLoading} {...props}>
      {isLoading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles['loading-text']}>読み込み中</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
