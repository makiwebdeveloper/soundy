import { playlists } from "@/lib/db/schema";
import { TrackType } from "./tracks.types";

export type PlaylistType = typeof playlists.$inferSelect;

export type PlaylistWithTracksType = PlaylistType & { tracks: TrackType[] };
