import "server-only";

import { db } from "@/lib/db";
import { followings } from "@/lib/db/schema";
import { FollowingCreationType, FollowingType } from "@/types/followings.types";
import { and, eq } from "drizzle-orm";

export async function followProfile(data: FollowingCreationType) {
  await db.insert(followings).values(data);
}

export async function unfollowProfile(data: FollowingCreationType) {
  await db
    .delete(followings)
    .where(
      and(
        eq(followings.followerId, data.followerId),
        eq(followings.followingId, data.followingId)
      )
    );
}

export async function getFollowing(
  data: FollowingCreationType
): Promise<FollowingType | undefined> {
  return db.query.followings.findFirst({
    where: and(
      eq(followings.followerId, data.followerId),
      eq(followings.followingId, data.followingId)
    ),
  });
}

export async function getProfilePopularity(profileId: number) {
  const followers = await db.query.followings.findMany({
    where: eq(followings.followingId, profileId),
  });

  const dbFollowings = await db.query.followings.findMany({
    where: eq(followings.followerId, profileId),
  });

  return {
    followers,
    followings: dbFollowings,
  };
}
