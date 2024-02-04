import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";
import { Button, ButtonProps } from "../../../components/Button";

export type FileUploadButtonProps = {
  children?: ReactNode;
} & Omit<ButtonProps, "onChange"> &
  Pick<InputHTMLAttributes<HTMLInputElement>, "accept"> &
  (
    | {
        multiple: true;
        onChange(files: File[]): void;
      }
    | {
        multiple?: false;
        onChange(file: File): void;
      }
  );

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  onChange,
  accept,
  children,
  multiple,
  ...buttonProps
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        onClick={() => {
          // Trigger the click event on the hidden file input
          fileInputRef.current?.click();
        }}
        type="button"
        {...buttonProps}
      >
        {children}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        multiple={multiple}
        onChange={(event) => {
          const files = event.target.files;
          if (!files || !onChange) {
            return;
          }

          if (multiple) {
            onChange([...files]);
          } else {
            onChange(files[0]);
          }
        }}
        style={{ display: "none" }} // Hide the file input
        accept={accept}
      />
    </>
  );
};
