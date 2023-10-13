import { profiles } from "@/lib/db/schema";

export type ProfileType = typeof profiles.$inferSelect;
