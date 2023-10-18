import { comments } from "@/lib/db/schema";
import { ProfileType } from "./profiles.types";
import { TrackType } from "./tracks.types";

export type CommentCreationType = typeof comments.$inferInsert;

export type CommentType = typeof comments.$inferSelect;

export type FullCommentType = CommentType & {
  profile: ProfileType;
  track: TrackType;
};
