import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { NumberInput, NumberInputProps } from "../NumberInput";

type FormTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, any>;
} & Omit<NumberInputProps, "onChange" | "value" | "ref">;

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field } }) => (
        <NumberInput {...field} {...props} />
      )}
    />
  );
};
