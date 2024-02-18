import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState, type ComponentPropsWithoutRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../../../components/inputs/form/FormTextInput";
import { PlayerInfo } from "../models/PlayerInfo";
import { gameLobbyStoreActions } from "../../gameLobby/hooks/useGameLobbyStore";
import { Avatar } from "../../avatar/components/Avatar";
import styles from "./PlayerForm.module.scss";
import { Button, ButtonProps } from "../../../components/Button";
import { AvatarRegenerationButton } from "../../avatar/components/AvatarRegenerationButton";
import { generateAvatarSeed } from "../../avatar/utils/generateAvatarSeed";
import { generatePlayerName } from "../utils/generatePlayerName";
import { combineClasses } from "../../../utils/combineClasses";

const playerInfoSchema = z.object({
  name: z.string().max(100).optional(),
  avatarSeed: z.string(),
});

type PlayerInfoSchemaType = z.infer<typeof playerInfoSchema>;

type PlayerFormProps = {
  playerInfo?: PlayerInfo;
  submitButtonProps: ButtonProps;
  onSubmit(playerInfo: Pick<PlayerInfo, "name" | "avatarSeed">): void;
  cancelButtonProps?: ButtonProps;
  resetOnSubmit?: boolean;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const PlayerForm: FC<PlayerFormProps> = ({
  playerInfo: initialPlayerInfo,
  submitButtonProps,
  onSubmit,
  cancelButtonProps,
  resetOnSubmit = false,
  className,
  ...props
}) => {
  const { control, handleSubmit, setValue, reset } =
    useForm<PlayerInfoSchemaType>({
      resolver: zodResolver(playerInfoSchema),
      defaultValues: initialPlayerInfo ?? {
        avatarSeed: generateAvatarSeed(),
      },
    });

  const avatarSeed = useWatch({
    control,
    name: "avatarSeed",
  });

  const [placeholderName, setPlaceholderName] = useState(generatePlayerName());
  const regenerateDefaultValue = () => {
    reset();
    setPlaceholderName(generatePlayerName());
    setValue("avatarSeed", generateAvatarSeed());
  };

  return (
    <form
      className={combineClasses(className, styles.playerForm)}
      onSubmit={handleSubmit((data) => {
        onSubmit({ ...data, name: data.name ? data.name : placeholderName });

        if (resetOnSubmit) {
          regenerateDefaultValue();
        }
      })}
      {...props}
    >
      <Avatar avatarSeed={avatarSeed} />
      <div className={styles.nameInputWraper}>
        <FormTextInput
          name="name"
          control={control}
          className={styles.nameInput}
          autoComplete="false"
          placeholder={placeholderName}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button type="submit" {...submitButtonProps} />
        {cancelButtonProps && <Button type="button" {...cancelButtonProps} />}
      </div>
      <AvatarRegenerationButton
        onRegenerateClick={(newSeed) => setValue("avatarSeed", newSeed)}
      />
    </form>
  );
};
