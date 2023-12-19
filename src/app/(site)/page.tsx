import { PageLayout } from "@/components/page-layout";
import {
  HomeForYou,
  HomeGoodDay,
  HomeHeader,
  HomeRecentlyPlayed,
} from "@/components/pages/home";

export default async function HomePage() {
  return (
    <PageLayout>
      <HomeHeader />
      <HomeGoodDay />
      <HomeForYou />
      <HomeRecentlyPlayed />
    </PageLayout>
  );
}
