import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { TextInput, TextInputProps } from "../TextInput";

type FormTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, any>;
} & Omit<TextInputProps, "onChange" | "value">;

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <TextInput ref={ref} {...field} {...props} />
      )}
    />
  );
};
