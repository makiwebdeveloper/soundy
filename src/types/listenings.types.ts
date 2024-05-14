import { listenings } from "@/lib/db/schema";
import { TrackWithListeningsType } from "./albums.types";

export type ListeningCreationType = typeof listenings.$inferInsert;

export type ListeningType = typeof listenings.$inferSelect;

export type ListeningTrackType = ListeningType & {
  track: TrackWithListeningsType;
};
