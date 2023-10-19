import { TrackWithListeningsType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";
import AlbumTrackItem from "./album-track-item";

interface Props {
  tracks: TrackWithListeningsType[];
  profile: Pick<ProfileType, "id" | "name">;
}

export default function AlbumTracks({ tracks, profile }: Props) {
  return (
    <div className="space-y-1">
      {tracks.map((track) => (
        <AlbumTrackItem key={track.id} track={track} profile={profile} />
      ))}
    </div>
  );
}
