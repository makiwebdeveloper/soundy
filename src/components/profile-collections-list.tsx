import { ProfileType } from "@/types/profiles.types";
import ProfileCollectionsItem from "./profile-collections-item";
import { cn } from "@/lib/cn";
import { Music2Icon } from "lucide-react";
import { IPlayingContext } from "@/types/playing-contexts.types";
import Link from "next/link";

export type CollectionsItemType = {
  id: number;
  imageUrl: string;
  title: string;
  profile: ProfileType;
  isPublic: boolean;
};

export type CollectionsType = "tracks" | "albums" | "playlists" | "favorites";

interface Props {
  type: CollectionsType;
  items: CollectionsItemType[];
  context: IPlayingContext;
}

export default function ProfileCollectionsList({
  type,
  items,
  context,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="flex items-center gap-2">
          No {type} yet
          <Music2Icon className="w-4 h-4" />
        </p>
        {type === "tracks" || type === "albums" ? (
          <Link
            href="/upload"
            className="cursor-pointer text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
          >
            Upload {type === "tracks" ? "track" : "album"}
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto md:mx-0 grid gap-3",
        items.length === 1 &&
          "grid-cols-1 w-[100px] sm:w-[125px] lg:w-[135px] 2xl:w-[180px]",
        items.length === 2 &&
          "grid-cols-2 w-[212px] sm:w-[262px] lg:w-[282px] 2xl:w-[372px]",
        items.length > 2 &&
          "w-[324px] grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:w-[536px] md:w-full"
      )}
    >
      {items.map((item) => (
        <ProfileCollectionsItem
          type={type}
          item={item}
          context={context}
          key={item.id}
        />
      ))}
    </div>
  );
}
