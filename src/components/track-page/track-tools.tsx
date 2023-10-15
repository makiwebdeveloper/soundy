import {
  PlayTrackButton,
  ToggleFavoriteButton,
  CopyLinkButton,
} from "./buttons";
import { AddToPlaylistDialog, TrackDetailsDialog } from "@/components/dialogs";
import { getFavoriteTrack } from "@/services/favorite-tracks.service";
import { getProfilePlaylists } from "@/services/playlists.service";
import { FullTrackType } from "@/types/tracks.types";

interface Props {
  track: FullTrackType;
  profileId: number;
}

export default async function TrackTools({ track, profileId }: Props) {
  const favoriteTrackData = getFavoriteTrack({
    profileId: profileId,
    trackId: track.id,
  });
  const playlistsData = getProfilePlaylists(profileId);

  const [favoriteTrack, playlists] = await Promise.all([
    favoriteTrackData,
    playlistsData,
  ]);

  return (
    <div className="flex gap-3 flex-col sm:flex-row justify-center md:justify-normal">
      <PlayTrackButton trackId={track.id} />
      <ToggleFavoriteButton
        trackId={track.id}
        initialFavoriteTrack={favoriteTrack}
      />
      <CopyLinkButton />
      <AddToPlaylistDialog trackId={track.id} initialPlaylists={playlists} />
      <TrackDetailsDialog track={track} />
    </div>
  );
}
