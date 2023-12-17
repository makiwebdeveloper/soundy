import {
  contextRepeatEnum,
  favoriteTracks,
  playingContexts,
  playingTracks,
  tracks,
} from "@/lib/db/schema";
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

export type TrackWithListeningsType = TrackType & {
  listenings: ListeningType[];
  profile: ProfileType;
};

export type PlayingTrackType = typeof playingTracks.$inferSelect;

export type PlayingContextType = typeof playingContexts.$inferSelect;

export type FullPlayingTrackType = PlayingTrackType & {
  track: TrackType & {
    profile: ProfileType;
  };
  profile: ProfileType;
  playingContext: PlayingContextType;
};

export type ContextRepeatType = "NO-REPEAT" | "REPEAT-ALL" | "REPEAT-TRACK";
