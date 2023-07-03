import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../../../components/inputs/form/FormTextInput";
import { PlayerInfo } from "../models/PlayerInfo";
import { gameLobbyActions } from "../../gameLobby/hooks/useGameLobby";
import { Avatar } from "./Avatar";

const playerInfoSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  avatarSeed: z.string(),
});

type PlayerInfoSchemaType = z.infer<typeof playerInfoSchema>;

type PlayerFormProps = {
  playerInfo?: PlayerInfo;
  onSubmit?(playerInfo: PlayerInfoSchemaType): void;
};

export const PlayerForm: FC<PlayerFormProps> = ({
  playerInfo: initialPlayerInfo,
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PlayerInfoSchemaType>({
    resolver: zodResolver(playerInfoSchema),
    defaultValues: initialPlayerInfo,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        if (initialPlayerInfo) {
          gameLobbyActions.player.edit(initialPlayerInfo.id, values);
          return;
        }

        gameLobbyActions.player.add(values);
      })}
    >
      <Avatar avatarSeed={getValues().avatarSeed} />
      <FormTextInput name="name" control={control} />
    </form>
  );
};
