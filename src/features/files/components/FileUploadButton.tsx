import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";
import { Button } from "../../../components/Button";

export type FileUploadButtonProps = {
  onChange(file: File): void;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  children?: ReactNode;
};

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  onChange,
  accept,
  children,
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
      >
        {children}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && onChange) {
            onChange(file);
          }
        }}
        style={{ display: "none" }} // Hide the file input
        accept={accept}
      />
    </>
  );
};
