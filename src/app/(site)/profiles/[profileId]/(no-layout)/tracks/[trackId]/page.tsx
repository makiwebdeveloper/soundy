import { notFound, redirect } from "next/navigation";
import { getTrackById } from "@/services/tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getCommentsByTrackId } from "@/services/comments.service";
import { Track } from "@/components/pages/track";
import { getProfilePlaylists } from "@/services/playlists.service";
import { Metadata } from "next";

interface Props {
  params: {
    profileId: string;
    trackId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = await getTrackById(Number(params.trackId));

  if (!track)
    return {
      title: "Not found",
      description: "The page is not found.",
    };

  return {
    title: track.title,
    description: `Embark on a musical journey with ${track.title} on Soundy! Immerse yourself in the soulful melodies, intricate rhythms, and captivating lyrics of this exceptional track. From the first note to the last, experience the magic of [Artist Name]'s creation. Join the moment, hit play, and let the music take you on a transcendent voyage. 🎵✨ #Soundy #MusicJourney #NowPlaying`,
  };
}

export default async function TrackPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const track = await getTrackById(Number(params.trackId));
  const playlists = await getProfilePlaylists({
    profileId: currentProfile.id,
  });

  if (!track) {
    notFound();
  }

  const isCreator = track.profileId === currentProfile.id;

  if (!track.isPublic && !isCreator) {
    notFound();
  }

  const comments = await getCommentsByTrackId(track.id, "desc");

  return (
    <Track
      currentProfile={currentProfile}
      initialTrack={track}
      initialComments={comments}
      initialPlaylists={playlists}
    />
  );
}
