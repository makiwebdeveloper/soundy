import { profiles } from "@/lib/db/schema";
import { AlbumType } from "./albums.types";
import { FollowingType } from "./followings.types";
import { FavoriteTrackType, TrackType } from "./tracks.types";

export type ProfileType = typeof profiles.$inferSelect;

export type FullProfileType = ProfileType & {
  tracks: TrackType[];
  albums: AlbumType[];
  favoriteTracks: FavoriteTrackType[];
  followings: FollowingType[];
  followers: FollowingType[];
};
