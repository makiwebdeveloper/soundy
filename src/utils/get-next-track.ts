import { TrackWithListeningsType } from "@/types/albums.types";
import { getRandomElementFromArray } from "./get-random-element-from-array";

export function getNextTrack({
  tracks,
  playingTrackId,
  isShuffle,
  repeat,
}: {
  tracks: TrackWithListeningsType[];
  playingTrackId: number;
  isShuffle: boolean;
  repeat: "NO-REPEAT" | "REPEAT-ALL" | "REPEAT-TRACK";
}): number {
  const currentIndex = tracks.findIndex((track) => track.id === playingTrackId);

  if (isShuffle) {
    const randomTrack = getRandomElementFromArray(tracks, currentIndex);

    return randomTrack.id;
  } else {
    if (currentIndex !== tracks.length - 1) {
      return tracks[currentIndex + 1].id;
    } else {
      if (repeat === "REPEAT-ALL") {
        return tracks[0].id;
      } else {
        return tracks[tracks.length - 1].id;
      }
    }
  }
}
