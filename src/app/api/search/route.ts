import { getCurrentProfile } from "@/services/profiles.service";
import { getSearchItems } from "@/services/search.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const value = searchParams.get("value");

    if (!value) {
      return NextResponse.json(
        {
          items: {
            tracks: [],
            albums: [],
            profiles: [],
            playlists: [],
          },
        },
        { status: 200 }
      );
    }

    const searchResult = await getSearchItems(value);

    return NextResponse.json({ items: searchResult }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to get search items. Please try later" },
      { status: 500 }
    );
  }
}
