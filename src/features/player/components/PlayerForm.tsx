import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, type FC, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../../../components/inputs/form/FormTextInput";
import { PlayerInfo } from "../models/PlayerInfo";
import { gameLobbyActions } from "../../gameLobby/hooks/useGameLobby";
import { Avatar } from "../../avatar/components/Avatar";
import styles from "./PlayerForm.module.scss";
import { Button } from "../../../components/Button";
import { AvatarRegenerationButton } from "../../avatar/components/AvatarRegenerationButton";
import { generateAvatarSeed } from "../../avatar/utils/generateAvatarSeed";
import { generatePlayerName } from "../utils/generatePlayerName";

const playerInfoSchema = z.object({
  name: z.string().max(100).optional(),
  avatarSeed: z.string(),
});

type PlayerInfoSchemaType = z.infer<typeof playerInfoSchema>;

type PlayerFormProps = {
  playerInfo?: PlayerInfo;
};

export const PlayerForm: FC<PlayerFormProps> = ({
  playerInfo: initialPlayerInfo,
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<PlayerInfoSchemaType>({
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
    setPlaceholderName(generatePlayerName());
    setValue("avatarSeed", generateAvatarSeed());
  };

  return (
    <form
      className={styles.playerForm}
      onSubmit={handleSubmit(
        (values) => {
          const newPlayerName = values.name || placeholderName;

          if (initialPlayerInfo) {
            gameLobbyActions.player.edit(initialPlayerInfo.id, {
              ...values,
              name: newPlayerName,
            });
            return;
          }

          gameLobbyActions.player.add({ ...values, name: newPlayerName });
          regenerateDefaultValue();
        },
        (error) => {
          console.log("Failed to add", { error });
        }
      )}
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
      <Button type="submit">+ Add</Button>
      <AvatarRegenerationButton
        onRegenerateClick={(newSeed) => setValue("avatarSeed", newSeed)}
      />
    </form>
  );
};
