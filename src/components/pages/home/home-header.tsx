import { ProfileType } from "@/types/profiles.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  currentProfile: ProfileType;
}

export default function HomeHeader({ currentProfile }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3 2xl:gap-5">
        <h1 className="text-4xl 2xl:text-6xl font-bold">Soundy</h1>
        <div className="h-7 2xl:h-14 w-[3px] 2xl:w-1 bg-white rounded-full"></div>
        <h3 className="text-xl 2xl:text-2xl font-semibold">Home</h3>
      </div>
      <Link
        href={`/profiles/${currentProfile.id}`}
        className="relative w-14 h-14"
      >
        <Image
          fill
          className="object-cover rounded-full bg-white/20 dark:bg-black/20"
          src={currentProfile.imageUrl}
          alt={`${currentProfile.name} image`}
        />
      </Link>
    </header>
  );
}
