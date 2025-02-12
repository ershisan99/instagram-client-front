import { Checkbox, CheckboxProps } from '@/components/checkbox'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'control'> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'> & { control: Control<T> }

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  disabled,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value, ...rememberMeField },
  } = useController({
    control,
    name,
    disabled,
    shouldUnregister,
  })

  return <Checkbox {...rest} {...rememberMeField} checked={value} onCheckedChange={onChange} />
}
