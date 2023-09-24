"use client";

import SidebarSheet from "./sidebar-sheet";

export default function MusicPlayer() {
  return (
    <div className="fixed bottom-0 md:bottom-5 h-20 w-full md:w-[650px] lg:w-[800px] left-0 md:left-[50%] md:translate-x-[-50%] bg-white/20 dark:bg-black/20 backdrop-blur-md md:rounded-3xl border-t md:border border-white/40 dark:border-black/40 p-3">
      <SidebarSheet />
    </div>
  );
}
