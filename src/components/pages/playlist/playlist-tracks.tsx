import { TrackWithListeningsType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";
import PlaylistTrackItem from "./playlist-track-item";
import { PlaylistWithTracksType } from "@/types/playlists.types";

interface Props {
  tracks: TrackWithListeningsType[];
  profile: ProfileType;
  playlist: Pick<PlaylistWithTracksType, "id" | "profileId">;
}

export default function PlaylistTracks({ tracks, profile, playlist }: Props) {
  return (
    <div className="space-y-1">
      {tracks.map((track) => (
        <PlaylistTrackItem
          key={track.id}
          track={track}
          profile={profile}
          playlist={playlist}
        />
      ))}
    </div>
  );
}
