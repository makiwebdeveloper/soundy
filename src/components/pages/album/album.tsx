"use client";

import axios from "axios";
import { PageLayout } from "@/components/page-layout";
import { AlbumHeader, AlbumTracks } from ".";
import { FullAlbumType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";
import { useQuery } from "@tanstack/react-query";

interface Props {
  initialAlbum: FullAlbumType;
  currentProfile: ProfileType;
}

export default function Album({ initialAlbum, currentProfile }: Props) {
  const { data: album } = useQuery({
    queryKey: [`album ${initialAlbum.id}`],
    queryFn: async () => {
      const res = await axios.get<{ album: FullAlbumType }>(
        `/api/albums/${initialAlbum.id}`
      );
      return res.data.album;
    },
    initialData: initialAlbum,
  });

  return (
    <PageLayout>
      <AlbumHeader album={album} profile={currentProfile} />
      <AlbumTracks tracks={album.tracks} profile={album.profile} />
    </PageLayout>
  );
}
