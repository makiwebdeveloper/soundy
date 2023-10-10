import Image from "next/image";
import { PageDescription, PageTitle } from "../page-layout";

interface Props {
  title: string;
  imageUrl: string;
  creator: string;
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
      <div className="flex-1">
        <div>
          <PageTitle className="break-all">{props.title}</PageTitle>
          <PageDescription>Made by: {props.creator}</PageDescription>
        </div>
      </div>
    </div>
  );
}
