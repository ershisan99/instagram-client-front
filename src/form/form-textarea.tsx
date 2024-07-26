import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Textarea, TextareaProps } from '@/components/textarea'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'control' | 'defaultValue' | 'rules'
> &
  Omit<TextareaProps, 'value' | 'onChange'> & { control: Control<T> }

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  disabled,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    disabled,
    shouldUnregister,
  })
  return <Textarea errorMessage={error?.message} {...field} {...rest} />
}
