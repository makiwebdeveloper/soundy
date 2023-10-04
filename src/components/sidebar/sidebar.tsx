import SidebarItems from "./sidebar-items";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";
import SidebarSheet from "./sidebar-sheet";

export default async function Sidebar() {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  return (
    <aside className="p-1 lg:px-2 lg:py-4 2xl:p-4 bg-white/10 dark:bg-black/20 hidden md:block md:rounded-l-3xl w-[55px] lg:w-[180px] 2xl:w-[250px] h-full border-r border-white/30 dark:border-black/40 md:border-none">
      <SidebarItems profileId={currentProfile.id} className="hidden lg:flex" />
      <SidebarSheet
        className="lg:hidden"
        currentProfileId={currentProfile.id}
      />
    </aside>
  );
}
