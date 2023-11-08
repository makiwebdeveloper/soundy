import { favoriteTracks } from "@/lib/db/schema";
import { ProfileType } from "./profiles.types";
import { TrackType } from "./tracks.types";

export type FavoriteTrackCreationType = {
  profileId: number;
  trackId: number;
};

export type FavoriteTrackType = typeof favoriteTracks.$inferSelect;

export type FullFavoriteTrackType = FavoriteTrackType & {
  profile: ProfileType;
  track: TrackType;
};
