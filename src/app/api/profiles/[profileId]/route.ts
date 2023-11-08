import { editProfileValidator } from "@/lib/validators/profiles";
import { getCurrentProfile, updateProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, imageUrl } = editProfileValidator.parse(body);

    await updateProfile(
      { name: name || undefined, imageUrl: imageUrl || undefined },
      currentProfile
    );

    return NextResponse.json({ message: "OK" }, { status: 200 });
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
