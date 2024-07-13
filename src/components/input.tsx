import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'
import { clsx } from 'clsx'

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  errorMessage?: string
  label?: string
}

export const Input = forwardRef<ElementRef<'input'>, InputProps>(
  ({ className, label, errorMessage, id, ...props }, ref) => {
    const generatedId = useId()
    const finalId = id ?? generatedId

    return (
      <div className={'flex flex-col gap-0.5'}>
        {!!label && (
          <label className={'text-sm text-slate-700'} htmlFor={finalId}>
            {label}
          </label>
        )}
        <input
          className={clsx('border rounded-md p-3', className)}
          id={finalId}
          {...props}
          ref={ref}
        />
        {!!errorMessage && <p className={'text-sm text-red-500'}>{errorMessage}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
