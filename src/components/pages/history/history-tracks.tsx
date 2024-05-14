import { ListeningTrackType } from "@/types/listenings.types";
import HistoryTrackItem from "./history-track-item";
import { cn } from "@/lib/cn";

interface Props {
  listenings: ListeningTrackType[];
}

export default function HistoryTracks({ listenings }: Props) {
  return (
    <div
      className={cn(
        "mx-auto md:mx-0 grid gap-3",
        listenings.length === 1 &&
          "grid-cols-1 w-[100px] sm:w-[125px] lg:w-[135px] 2xl:w-[180px]",
        listenings.length === 2 &&
          "grid-cols-2 w-[212px] sm:w-[262px] lg:w-[282px] 2xl:w-[372px]",
        listenings.length > 2 &&
          "w-[324px] grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:w-[536px] md:w-full"
      )}
    >
      {listenings.map((listening) => (
        <HistoryTrackItem key={listening.id} listening={listening} />
      ))}
    </div>
  );
}
