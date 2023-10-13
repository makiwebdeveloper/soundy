import { albums } from "@/lib/db/schema";

export type AlbumType = typeof albums.$inferSelect;
