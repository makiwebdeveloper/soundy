import { Button } from "@/components/ui/button";
import { CopyPlusIcon } from "lucide-react";

interface Props {}

export default function AddToPlaylistButton({}: Props) {
  return (
    <Button>
      <CopyPlusIcon className="mr-2 w-4 h-4" />
      Add to playlist
    </Button>
  );
}
