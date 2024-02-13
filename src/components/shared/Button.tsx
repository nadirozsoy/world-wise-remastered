import type { IButtonProps } from '@/types'
import { cn } from '@/lib/utils'

const Button = ({ onClick, className, children, type }: IButtonProps) => {
  return (
    <button
      type={(type as 'submit' | 'button' | 'reset' | undefined) ?? 'button'}
      id='customButton'
      className={cn(
        'inline-block rounded-lg bg-[--color-brand--2] p-[.5rem_2rem] text-[1.6rem] font-semibold uppercase text-[--color-dark--1]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
