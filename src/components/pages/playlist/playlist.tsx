"use client";

import { PageLayout } from "@/components/page-layout";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import { ProfileType } from "@/types/profiles.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PlaylistHeader from "./playlist-header";
import PlaylistTracks from "./playlist-tracks";

interface Props {
  initialPlaylist: PlaylistWithTracksType;
  profile: ProfileType;
}

export default function Playlist({ initialPlaylist, profile }: Props) {
  const { data: playlist } = useQuery({
    queryKey: [`playlist ${initialPlaylist.id}`],
    queryFn: async () => {
      const res = await axios.get<{ playlist: PlaylistWithTracksType }>(
        `/api/playlists/${initialPlaylist.id}`
      );
      return res.data.playlist;
    },
    initialData: initialPlaylist,
  });

  return (
    <PageLayout>
      <PlaylistHeader playlist={playlist} profile={profile} />
      <PlaylistTracks
        tracks={playlist.tracks}
        profile={profile}
        playlist={playlist}
      />
    </PageLayout>
  );
}
