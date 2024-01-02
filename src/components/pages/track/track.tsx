"use client";

import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/page-layout";
import { Comments, TrackHeader, TrackTools } from "@/components/pages/track";
import { FullTrackType } from "@/types/tracks.types";
import { ProfileType } from "@/types/profiles.types";
import { FullCommentType } from "@/types/comments.types";
import { PlaylistWithTracksType } from "@/types/playlists.types";

interface Props {
  currentProfile: ProfileType;
  initialTrack: FullTrackType;
  initialComments: FullCommentType[];
  initialPlaylists: PlaylistWithTracksType[];
}

export default function Track({
  initialTrack,
  initialComments,
  currentProfile,
  initialPlaylists,
}: Props) {
  const { data: track } = useQuery({
    queryKey: [`track ${initialTrack.id}`],
    queryFn: async () => {
      const res = await axios.get<{ track: FullTrackType }>(
        `/api/tracks/${initialTrack.id}`
      );
      return res.data.track;
    },
    initialData: initialTrack,
  });

  const { data: comments } = useQuery({
    queryKey: [`track ${initialTrack.id} comments`],
    queryFn: async () => {
      const res = await axios.get<{ comments: FullCommentType[] }>(
        `/api/comments?trackId=${initialTrack.id}`
      );
      return res.data.comments;
    },
    initialData: initialComments,
  });

  const { data: playlists } = useQuery({
    queryKey: [`profile ${currentProfile.id} playlists`],
    queryFn: async () => {
      const res = await axios.get<{ playlists: PlaylistWithTracksType[] }>(
        "/api/playlists"
      );
      return res.data.playlists;
    },
    initialData: initialPlaylists,
  });

  const isFavoriteTrack = useMemo(
    () =>
      !!track.favoriteTracks.find(
        (item) => item.profileId === currentProfile.id
      ),
    [track.favoriteTracks]
  );

  return (
    <PageLayout>
      <TrackHeader track={track} profile={currentProfile} />
      <TrackTools
        track={track}
        isFavoriteTrack={isFavoriteTrack}
        playlists={playlists}
        profileId={currentProfile.id}
      />
      <div className="h-[3px] bg-white/20 dark:bg-black/40 w-full rounded-full"></div>
      <Comments
        comments={comments}
        trackId={track.id}
        currentProfileId={currentProfile.id}
      />
    </PageLayout>
  );
}
