import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { CreateProfileValidatorType } from "@/lib/validators/profiles";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getCurrentProfile() {
  const { userId } = auth();

  if (!userId) {
    return undefined;
  }

  const profile = await findProfileByUserId(userId);

  return profile;
}

export async function findProfileByUserId(userId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}

export async function createProfile(
  data: CreateProfileValidatorType & { userId: string }
) {
  const createdProfile = await db
    .insert(profiles)
    .values(data)
    .returning({ id: profiles.id });
  return createdProfile[0].id;
}
