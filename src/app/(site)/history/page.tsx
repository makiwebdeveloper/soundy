import { PageHeader, PageLayout, PageTitle } from "@/components/page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | Soundy",
  description:
    "Relive your musical journey on Soundy's History Page! Rediscover the tracks that accompanied your moments. Whether it's yesterday's favorite tune or a cherished playlist, our history feature lets you explore your musical timeline. Embrace nostalgia and celebrate the soundtrack of your life. Join Soundy and make every beat memorable! 🎵📜 #Soundy #MusicHistory #ReliveTheMoments",
};

export default function History() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>History</PageTitle>
      </PageHeader>
    </PageLayout>
  );
}
