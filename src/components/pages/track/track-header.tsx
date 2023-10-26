import Image from "next/image";
import Link from "next/link";
import { PageDescription, PageTitle } from "@/components/page-layout";

interface Props {
  title: string;
  imageUrl: string;
  profileId: number;
  profileName: string;
}

export default function TrackHeader(props: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
      <div className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
        <Image
          src={props.imageUrl}
          alt={`${props.title} image`}
          fill
          className="object-contain rounded-md bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1 text-center md:text-start">
        <PageTitle className="break-all">{props.title}</PageTitle>
        <PageDescription>
          Made by:{" "}
          <Link
            className="transition hover:text-white hover:underline"
            href={`/profiles/${props.profileId}`}
          >
            {props.profileName}
          </Link>
        </PageDescription>
      </div>
    </div>
  );
}
