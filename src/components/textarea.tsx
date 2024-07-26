import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'
import { clsx } from 'clsx'

export type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  errorMessage?: string
  label?: string
}

export const Textarea = forwardRef<ElementRef<'textarea'>, TextareaProps>(
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
        <textarea
          className={clsx('border rounded-md p-3 resize-none', className)}
          id={finalId}
          {...props}
          ref={ref}
        />
        {!!errorMessage && <p className={'text-sm text-red-500'}>{errorMessage}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
