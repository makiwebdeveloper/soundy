import "server-only";

import { db } from "@/lib/db";
import { listenings } from "@/lib/db/schema";
import { ListeningCreationType } from "@/types/listenings.types";
import { and, eq, sql } from "drizzle-orm";

export async function getListening(data: {
  profileId: number;
  trackId: number;
}) {
  return db.query.listenings.findFirst({
    where: and(
      eq(listenings.profileId, data.profileId),
      eq(listenings.trackId, data.trackId)
    ),
  });
}

export async function createListening(data: ListeningCreationType) {
  const dbListening = await db
    .insert(listenings)
    .values(data)
    .returning({ listeningId: listenings.id });

  const listeningId = dbListening[0].listeningId;
  return listeningId;
}

export async function updateListeningDate(id: number) {
  const dbListening = await db
    .update(listenings)
    .set({ updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(listenings.id, id))
    .returning({ listeningId: listenings.id });

  const listeningId = dbListening[0].listeningId;
  return listeningId;
}

export async function getListeningsByProfileId({
  profileId,
  limit,
  orderBy,
}: {
  profileId: number;
  limit?: number;
  orderBy?: "asc" | "desc";
}) {
  return db.query.listenings.findMany({
    where: eq(listenings.profileId, profileId),
    with: {
      track: true,
    },
    limit,
    orderBy: (listening, { asc, desc }) =>
      orderBy === "asc"
        ? [asc(listening.updatedAt)]
        : [desc(listening.updatedAt)],
  });
}
