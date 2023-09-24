import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function findProfileByUserId(userId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}
