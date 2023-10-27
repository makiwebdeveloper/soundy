import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { unfollowProfile } from "@/services/followings.service";
import { z } from "zod";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      profileId: string;
    };
  }
) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await unfollowProfile({
      followerId: currentProfile.id,
      followingId: Number(params.profileId),
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
