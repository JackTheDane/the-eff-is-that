import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { TextInput } from "../TextInput";

type FormTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, any>;
};

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <TextInput ref={ref} {...field} />
      )}
    />
  );
};
