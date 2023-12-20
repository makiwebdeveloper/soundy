import { PageLayout } from "@/components/page-layout";
import {
  HomeForYou,
  HomeGoodDay,
  HomeHeader,
  HomeRecentlyPlayed,
} from "@/components/pages/home";
import { getAlbums } from "@/services/albums.service";
import { getListeningsByProfileId } from "@/services/listenings.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getRecommendedTracks, getTracks } from "@/services/tracks.service";
import { redirect } from "next/navigation";

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
  );
}
