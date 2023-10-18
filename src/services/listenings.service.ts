import { db } from "@/lib/db";
import { listenings } from "@/lib/db/schema";
import { ListeningCreationType } from "@/types/listenings.types";
import { and, eq } from "drizzle-orm";

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
