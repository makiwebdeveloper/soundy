import { PageLayout } from "@/components/page-layout";
import {
  HomeForYou,
  HomeGoodDay,
  HomeHeader,
  HomeLoading,
  HomeRecentlyPlayed,
} from "@/components/pages/home";
import { getAlbums } from "@/services/albums.service";
import { getListeningsByProfileId } from "@/services/listenings.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getRecommendedTracks, getTracks } from "@/services/tracks.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | Soundy",
  description:
    "Welcome to Soundy - Your Ultimate Music Hub! Dive into a world of endless melodies and rhythms on our home page. Discover trending tracks, explore curated playlists, and experience the heartbeat of the music community. Soundy is your go-to destination for a harmonious journey through the soundscape. Join us now and let the music play! 🎶🌟 #Soundy #MusicHub #DiscoverSound",
};

export default async function HomePage() {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const albums = await getAlbums({
    limit: 1,
    random: true,
  });
  const tracks = await getTracks({
    limit: 2,
    random: true,
  });

  const recommendedTracks = await getRecommendedTracks(currentProfile.id);

  const listenings = await getListeningsByProfileId({
    profileId: currentProfile.id,
    limit: 6,
  });

  return (
    <Suspense fallback={<HomeLoading />}>
      <PageLayout>
        <HomeHeader currentProfile={currentProfile} />
        <HomeGoodDay
          profileId={currentProfile.id}
          album={{
            id: albums[0].id,
            title: albums[0].title,
            imageUrl: albums[0].imageUrl,
            profileId: albums[0].profileId,
          }}
          tracks={tracks.map((track) => ({
            id: track.id,
            title: track.title,
            imageUrl: track.imageUrl,
            profileId: track.profileId,
          }))}
        />
        <HomeForYou recommendedTracks={recommendedTracks} />
        <HomeRecentlyPlayed
          recentlyTracks={listenings.map((listening) => listening.track)}
        />
      </PageLayout>
    </Suspense>
  );
}
