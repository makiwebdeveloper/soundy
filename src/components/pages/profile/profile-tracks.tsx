import { TrackWithListeningsType } from "@/types/tracks.types";
import ProfileTrackItem from "./profile-track-item";
import { ProfileType } from "@/types/profiles.types";
import Link from "next/link";

interface Props {
  tracks: TrackWithListeningsType[];
  profile: ProfileType;
  type: "tracks" | "favorites";
}

export default function ProfileTracks({ tracks, profile, type }: Props) {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mx-2 flex items-center justify-between">
        <h3 className="text-2xl font-semibold capitalize">{type}</h3>
        <Link
          href={`/profiles/${profile.id}/${type}`}
          className="text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
        >
          See more
        </Link>
      </div>
      <div>
        {tracks.map((track) => (
          <ProfileTrackItem track={track} profile={profile} key={track.id} />
        ))}
      </div>
    </div>
  );
}
