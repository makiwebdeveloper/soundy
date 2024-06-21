import { playlists } from "@/lib/db/schema";
import { TrackType } from "./tracks.types";
import { ProfileType } from "./profiles.types";
import { TrackWithListeningsType } from "./albums.types";

export type PlaylistType = typeof playlists.$inferSelect;

export type PlaylistTracksType = PlaylistType & {
  playlistTracks: TrackType[];
};

export type PlaylistWithTracksType = PlaylistType & {
  tracks: TrackWithListeningsType[];
  profile: ProfileType;
};
