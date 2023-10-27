import { followProfileValidator } from "@/lib/validators/followings";
import { followProfile, getFollowing } from "@/services/followings.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { profileId } = followProfileValidator.parse(body);

    const existFollowing = await getFollowing({
      followerId: currentProfile.id,
      followingId: profileId,
    });

    if (existFollowing) {
      return NextResponse.json(
        { error: "You already follow this profile" },
        { status: 400 }
      );
    }

    await followProfile({
      followerId: currentProfile.id,
      followingId: profileId,
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to follow profile" },
      { status: 500 }
    );
  }
}
