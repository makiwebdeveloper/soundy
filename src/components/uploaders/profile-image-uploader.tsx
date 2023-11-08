"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface Props {
  image: string;
  setImage: (values: string) => void;
}

export default function ProfileImageUploader({ image, setImage }: Props) {
  const { toast } = useToast();

  function remove() {
    setImage("");
  }

  const dropzone = (
    <UploadDropzone
      endpoint="profileImage"
      appearance={{
        container:
          "transition p-10 mt-1 cursor-pointer border border-dashed rounded-3xl border-white/40 dark:border-black/60 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 group",
        uploadIcon: "transition text-white/50 group-hover:text-white w-20 h-20",
        label: "transition text-white/40 group-hover:text-white",
        allowedContent: "transition text-white/20 group-hover:text-white/60",
        button: "bg-white/30 dark:bg-black/40 mt-2 px-4",
      }}
      content={{
        label: "Choose profile image or drag and drop",
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
        setImage("");
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
      <div className="relative w-[100px] h-[100px] mx-auto my-5">
        <Image
          src={image}
          fill
          alt="profile image"
          className="peer/image object-cover rounded-full bg-white/20 dark:bg-black/20"
        />
        <Button
          onClick={remove}
          variant="destructive"
          className="transition md:hidden hover:block peer-hover/image:block absolute top-0 right-0 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return <div>{image ? preview : dropzone}</div>;
}
