"use client";

import {
  PlayTrackButton,
  ToggleFavoriteButton,
  CopyLinkButton,
} from "./buttons";
import { AddToPlaylistDialog, TrackDetailsDialog } from "@/components/dialogs";
import { FullTrackType } from "@/types/tracks.types";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import TrackPopularity from "./track-popularity";

interface Props {
  track: FullTrackType;
  isFavoriteTrack: boolean;
  playlists: PlaylistWithTracksType[];
  profileId: number;
}

export default function TrackTools({
  track,
  isFavoriteTrack,
  playlists,
  profileId,
}: Props) {
  return (
    <div className="flex gap-3 flex-col lg:flex-row items-center md:items-start lg:items-center lg:justify-between">
      <div className="flex gap-3 w-full flex-col sm:flex-row justify-center md:justify-normal">
        <PlayTrackButton trackId={track.id} />
        <ToggleFavoriteButton
          trackId={track.id}
          isFavoriteTrack={isFavoriteTrack}
        />
        <CopyLinkButton />
        <AddToPlaylistDialog
          trackId={track.id}
          playlists={playlists}
          profileId={profileId}
        />
        <TrackDetailsDialog track={track} />
      </div>
      <div>
        <TrackPopularity initialTrack={track} />
      </div>
    </div>
  );
}
