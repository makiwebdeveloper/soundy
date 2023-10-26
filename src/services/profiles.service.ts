import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { CreateProfileValidatorType } from "@/lib/validators/profiles";
import { FullProfileType, ProfileType } from "@/types/profiles.types";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getCurrentProfile() {
  const { userId } = auth();

  if (!userId) {
    return undefined;
  }

  const profile = await getProfileByUserId(userId);

  return profile;
}

export async function getProfileByUserId(userId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}

export async function getProfileById(
  profileId: number
): Promise<ProfileType | undefined> {
  return db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
  });
}

export async function getFullProfileById(
  profileId: number
): Promise<FullProfileType | undefined> {
  return db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
    with: {
      tracks: true,
      albums: true,
      favoriteTracks: true,
      followers: true,
      followings: true,
    },
  });
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
