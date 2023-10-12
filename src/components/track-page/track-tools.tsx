"use client";

import { FavoriteTrackType } from "@/types/tracks.types";
import {
  PlayTrackButton,
  ToggleFavoriteButton,
  CopyLinkButton,
  AddToPlaylistButton,
  DetailsButton,
} from "./buttons";

interface Props {
  trackId: number;
  initialFavoriteTrack: FavoriteTrackType | undefined;
}

export default function TrackTools({ trackId, initialFavoriteTrack }: Props) {
  return (
    <div className="flex gap-3">
      <PlayTrackButton trackId={trackId} />
      <ToggleFavoriteButton
        trackId={trackId}
        initialFavoriteTrack={initialFavoriteTrack}
      />
      <CopyLinkButton />
      <AddToPlaylistButton />
      <DetailsButton />
    </div>
  );
}
