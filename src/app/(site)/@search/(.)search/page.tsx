"use client";

import { SearchClient, SearchModalHeader } from "@/components/pages/search";
import { usePathname } from "next/navigation";

export default function SearchModal() {
  const pathname = usePathname();
  if (!pathname.includes("search")) {
    return null;
  }

  return (
    <div className="transition-all fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex-center bg-white/20 dark:bg-black/20">
      <article className="w-[600px] flex flex-col gap-3 border border-white/40 bg-white/30 p-6 shadow-lg rounded-lg dark:border-black/60 dark:bg-black/40 backdrop-blur-md">
        <SearchModalHeader />
        <SearchClient />
      </article>
    </div>
  );
}
