import { Button } from "../../../components/Button";
import { generateAvatarSeed } from "../utils/generateAvatarSeed";

type AvatarRegenerationButtonProps = {
  onRegenerateClick(newSeed: string): void;
  className?: string;
};

export const AvatarRegenerationButton = ({
  onRegenerateClick,
  className,
}: AvatarRegenerationButtonProps) => {
  return (
    <Button
      onClick={() => onRegenerateClick(generateAvatarSeed())}
      className={className}
      type="button"
    >
      🔁
    </Button>
  );
};
