import { playingTracks, tracks } from "@/lib/db/schema";
import { AlbumType } from "./albums.types";
import { ProfileType } from "./profiles.types";

export type AudioFileType = {
  name: string;
  url: string;
  position: number;
};

export type FavoriteTrackType = {
  id: number;
  profileId: number;
  trackId: number;
};

export type TrackType = typeof tracks.$inferSelect;

export type FullTrackType = TrackType & {
  album: AlbumType | null;
  profile: ProfileType;
};

export type PlayingTrackType = typeof playingTracks.$inferSelect;

export type FullPlayingTrackType = PlayingTrackType & {
  track: TrackType & {
    profile: ProfileType;
  };
  profile: ProfileType;
};
