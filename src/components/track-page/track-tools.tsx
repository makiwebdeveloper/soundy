"use client";

import {
  PlayTrackButton,
  ToggleFavoriteButton,
  CopyLinkButton,
  AddToPlaylistButton,
} from "./buttons";
import { TrackDetailsDialog } from "@/components/dialogs";
import { FavoriteTrackType, FullTrackType } from "@/types/tracks.types";

interface Props {
  track: FullTrackType;
  initialFavoriteTrack: FavoriteTrackType | undefined;
}

export default function TrackTools({ track, initialFavoriteTrack }: Props) {
  return (
    <div className="flex gap-3 flex-col sm:flex-row justify-center md:justify-normal">
      <PlayTrackButton trackId={track.id} />
      <ToggleFavoriteButton
        trackId={track.id}
        initialFavoriteTrack={initialFavoriteTrack}
      />
      <CopyLinkButton />
      <AddToPlaylistButton />
      <TrackDetailsDialog track={track} />
    </div>
  );
}
