import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/services/profiles.service";
import { getAlbumById } from "@/services/albums.service";
import { PageLayout } from "@/components/page-layout";
import { AlbumHeader, AlbumTracks } from "@/components/pages/album";
import { Metadata } from "next";

interface Props {
  params: {
    profileId: string;
    albumId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getAlbumById(Number(params.albumId));

  if (!album)
    return {
      title: "Not found",
      description: "The page is not found.",
    };

  return {
    title: album.title,
    description:
      album.description ||
      `Immerse yourself in the sonic masterpiece – ${album.title} on Soundy! Explore every note, lyric, and emotion encapsulated in this exceptional album. From chart-topping hits to hidden gems, this musical journey is curated for true enthusiasts. Join the experience, delve into the tracks, and let the album resonate with your soul. 🎧🌟 #Soundy #AlbumExperience #MusicJourney`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const album = await getAlbumById(Number(params.albumId));

  if (!album || album.tracks.length === 0) {
    notFound();
  }

  return (
    <PageLayout>
      <AlbumHeader album={album} profile={album.profile} />
      <AlbumTracks tracks={album.tracks} profile={album.profile} />
    </PageLayout>
  );
}
