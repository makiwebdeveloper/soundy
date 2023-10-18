import { listenings } from "@/lib/db/schema";

export type ListeningCreationType = typeof listenings.$inferInsert;

export type ListeningType = typeof listenings.$inferSelect;
