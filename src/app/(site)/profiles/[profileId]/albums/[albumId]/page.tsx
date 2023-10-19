import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/services/profiles.service";
import { getAlbumById } from "@/services/albums.service";
import { PageLayout } from "@/components/page-layout";
import { AlbumHeader, AlbumTracks } from "@/components/album-page";

interface Props {
  params: {
    profileId: string;
    albumId: string;
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
