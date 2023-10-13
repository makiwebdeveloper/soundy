import MusicPlayer from "@/components/music-player";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarSheet from "@/components/sidebar/sidebar-sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function SiteLayout({ children }: PropsWithChildren) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const playingTrack = await getPlayingTrack(currentProfile.id);

  return (
    <main>
      <article className="fixed top-0 md:top-[45%] md:translate-y-[-50%] left-0 md:left-[50%] md:translate-x-[-50%] w-full md:w-[750px] lg:w-[900px] 2xl:w-[1200px] h-[calc(100vh-80px)] md:h-[400px] lg:h-[500px] 2xl:h-[700px] md:flex bg-white/20 dark:bg-black/20 md:border border-white/40 dark:border-black/40 backdrop-blur-md md:rounded-3xl">
        <div className="sticky top-0 h-[40px] border-b border-white/40 dark:border-black/40">
          <SidebarSheet
            className="md:hidden"
            currentProfileId={currentProfile.id}
          />
        </div>
        <Sidebar />
        <ScrollArea className="w-full relative h-[calc(100vh-120px)] md:h-full">
          {children}
        </ScrollArea>
      </article>
      <MusicPlayer initialPlaingTrack={playingTrack} />
    </main>
  );
}
