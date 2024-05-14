import {
  PageContent,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout";
import { HistoryTracks } from "@/components/pages/history";
import { getListeningsByProfileId } from "@/services/listenings.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "History | Soundy",
  description:
    "Relive your musical journey on Soundy's History Page! Rediscover the tracks that accompanied your moments. Whether it's yesterday's favorite tune or a cherished playlist, our history feature lets you explore your musical timeline. Embrace nostalgia and celebrate the soundtrack of your life. Join Soundy and make every beat memorable! 🎵📜 #Soundy #MusicHistory #ReliveTheMoments",
};

export default async function History() {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const listenings = await getListeningsByProfileId({
    profileId: currentProfile.id,
    orderBy: "desc",
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>History</PageTitle>
      </PageHeader>
      <PageContent>
        <HistoryTracks listenings={listenings} />
      </PageContent>
    </PageLayout>
  );
}
