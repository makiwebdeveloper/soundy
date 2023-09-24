import { createProfileValidator } from "@/lib/validators/profile";
import {
  createProfile,
  findProfileByUserId,
} from "@/services/profiles.service";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, imageUrl } = createProfileValidator.parse(body);

    const existProfile = await findProfileByUserId(userId);

    if (existProfile) {
      return NextResponse.json({ profileId: existProfile.id }, { status: 200 });
    }

    const profileId = await createProfile({ name, imageUrl, userId });

    return NextResponse.json({ profileId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create profile. Please try later" },
      {
        status: 500,
      }
    );
  }
}
