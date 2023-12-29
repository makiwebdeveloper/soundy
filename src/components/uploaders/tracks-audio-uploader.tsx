"use client";

import { useToast } from "@/hooks/use-toast";
import { AudioFileType } from "@/types/tracks.types";
import { UploadDropzone } from "@/utils/uploadthing";

interface Props {
  setAudioFiles: (values: AudioFileType[]) => void;
}

export default function TracksAudioUploader({ setAudioFiles }: Props) {
  const { toast } = useToast();

  return (
    <div className="md:w-2/3 mt-10 md:mt-0 md:absolute md:top-[55%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
      <UploadDropzone
        endpoint="tracksAudio"
        appearance={{
          container:
            "transition py-14 mt-1 cursor-pointer border border-dashed rounded-3xl border-white/40 dark:border-black/60 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 group",
          uploadIcon:
            "transition text-white/50 group-hover:text-white w-20 h-20",
          label: "transition text-white group-hover:text-white",
          allowedContent: "hidden",
          button: "bg-white/30 dark:bg-black/40 mt-2 px-4",
        }}
        content={{
          label: "Drag and drop your tracks & albums here",
        }}
        onClientUploadComplete={(res) => {
          if (!res) {
            toast({
              title: "Something went wrong",
              variant: "destructive",
            });
            return;
          }

          setAudioFiles(
            res.map((item, index) => ({
              name: item.name.replace(/\.(mp3|wav)$/i, ""),
              url: item.url,
              position: index,
            }))
          );
        }}
        onUploadError={(error) => {
          console.log(error);
          setAudioFiles([]);
          toast({
            title: "Something went wrong",
            description:
              "Try again and make sure you upload no more than 20 files",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
}
