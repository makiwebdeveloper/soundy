import { PageLayout } from "@/components/page-layout";
import {
  HomeForYou,
  HomeGoodDay,
  HomeHeader,
  HomeRecentlyPlayed,
} from "@/components/pages/home";
import { getAlbums } from "@/services/albums.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getTracks } from "@/services/tracks.service";
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
      <HomeForYou />
      <HomeRecentlyPlayed />
    </PageLayout>
  );
}
