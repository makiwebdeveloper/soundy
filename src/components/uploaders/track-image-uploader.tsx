"use client";

import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface Props {
  image: string;
  setImage: (value: string) => void;
}

export default function TrackImageUploader({ image, setImage }: Props) {
  const { toast } = useToast();

  function removeImage() {
    setImage("");
  }

  const dropzone = (
    <UploadDropzone
      endpoint="trackImage"
      appearance={{
        container:
          "transition sm:w-[350px] mx-auto p-10 mt-1 cursor-pointer border border-dashed rounded-3xl border-white/40 dark:border-black/60 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 group",
        uploadIcon: "transition text-white/50 group-hover:text-white w-20 h-20",
        label: "transition text-white/40 group-hover:text-white",
        allowedContent: "transition text-white/20 group-hover:text-white/60",
        button: "bg-white/30 dark:bg-black/40 mt-2 px-4",
      }}
      content={{
        label: `Choose track image or drag and drop`,
      }}
      onClientUploadComplete={(res) => {
        if (res) {
          if (res.length > 1) {
            toast({
              title: "Uploadign error",
              description: "You can upload only one image",
              variant: "destructive",
            });
          } else {
            setImage(res[0].url);
            toast({
              title: "Success",
              description: "Your image was uploaded",
              variant: "success",
            });
          }
        }
      }}
      onUploadError={(error) => {
        removeImage();
        console.log(error);
        toast({
          title: "Something went wrong",
          description: "Try again and make sure you upload only one image",
          variant: "destructive",
        });
      }}
    />
  );

  const preview = (
    <div>
      <div className="relative w-[250px] h-[250px] md:w-[150px] md:lg:w-[200px] 2xl:w-[250px] md:h-[150px] lg:h-[200px] 2xl:h-[250px] mx-auto my-5">
        <Image
          src={image}
          fill
          alt="profile image"
          className="peer/image object-cover rounded-md bg-white/20 dark:bg-black/20"
        />
        <Button
          onClick={removeImage}
          variant="destructive"
          className="transition md:hidden hover:block peer-hover/image:block absolute top-2 right-2 p-1 h-auto"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return <div>{image ? preview : dropzone}</div>;
}
