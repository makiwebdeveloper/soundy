import { followings } from "@/lib/db/schema";

export type FollowingCreationType = typeof followings.$inferInsert;

export type FollowingType = typeof followings.$inferSelect;
