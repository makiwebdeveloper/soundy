import { UploadDropzone } from "@/utils/uploadthing";
import { uploaderAppearance } from "./utils";
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
      appearance={uploaderAppearance}
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
              description: "Your image was uploading",
              variant: "success",
            });
          }
        }
      }}
      onUploadError={(error) => {
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
          className="peer/image object-cover rounded-full bg-white/20"
        />
        <Button
          onClick={remove}
          variant="destructive"
          className="transition hidden hover:block peer-hover/image:block absolute top-0 right-0 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return <div>{image ? preview : dropzone}</div>;
}
