import { albums } from "@/lib/db/schema";
import { ProfileType } from "./profiles.types";
import { TrackType } from "./tracks.types";
import { ListeningType } from "./listenings.types";

export type AlbumType = typeof albums.$inferSelect;

export type TrackWithListeningsType = TrackType & {
  listenings: ListeningType[];
};

export type FullAlbumType = AlbumType & {
  profile: ProfileType;
  tracks: TrackWithListeningsType[];
};
