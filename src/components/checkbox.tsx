import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useAutoId } from '@/hooks/use-auto-id'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: ReactNode
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const finalId = useAutoId(id)
    return (
      <div className={'flex gap-2 items-center'}>
        <CheckboxPrimitive.Root
          id={finalId}
          className={clsx(
            'shadow-lg hover:bg-sky-300 flex h-[25px] border w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white  outline-none focus:shadow-[0_0_0_2px_black]',
            className
          )}
          {...props}
          ref={ref}
        >
          <CheckboxPrimitive.Indicator className="text-sky-500">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label htmlFor={finalId}>{label}</label>
      </div>
    )
  }
)

Checkbox.displayName = 'MyCheckbox'
