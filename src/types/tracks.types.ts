import { favoriteTracks, playingTracks, tracks } from "@/lib/db/schema";
import { AlbumType } from "./albums.types";
import { ProfileType } from "./profiles.types";
import { ListeningType } from "./listenings.types";

export type AudioFileType = {
  name: string;
  url: string;
  position: number;
};

export type FavoriteTrackType = typeof favoriteTracks.$inferSelect;

export type TrackType = typeof tracks.$inferSelect;

export type FullTrackType = TrackType & {
  album: AlbumType | null;
  profile: ProfileType;
  listenings: ListeningType[];
  favoriteTracks: FavoriteTrackType[];
};

export type PlayingTrackType = typeof playingTracks.$inferSelect;

export type FullPlayingTrackType = PlayingTrackType & {
  track: TrackType & {
    profile: ProfileType;
  };
  profile: ProfileType;
};
