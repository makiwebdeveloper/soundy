import "server-only";

import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import {
  CreateProfileValidatorType,
  EditProfileValidatorType,
} from "@/lib/validators/profiles";
import { FullProfileType, ProfileType } from "@/types/profiles.types";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { getProfilePopularity } from "./followings.service";

export async function getCurrentProfile(): Promise<ProfileType | undefined> {
  const { userId } = auth();

  if (!userId) {
    return undefined;
  }

  const profile = await getProfileByUserId(userId);

  return profile;
}

export async function getProfileByUserId(
  userId: string
): Promise<ProfileType | undefined> {
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
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
    with: {
      tracks: true,
      albums: true,
      favoriteTracks: true,
    },
  });

  if (!profile) return undefined;

  const popularity = await getProfilePopularity(profile.id);

  return {
    ...profile,
    ...popularity,
  };
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

export async function updateProfile(
  data: EditProfileValidatorType,
  profile: ProfileType
) {
  await db
    .update(profiles)
    .set({
      name: data.name ? data.name : profile.name,
      imageUrl: data.imageUrl ? data.imageUrl : profile.imageUrl,
    })
    .where(eq(profiles.id, profile.id));
}
