"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { v4 as uuidv4 } from "uuid";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface Props {
  imageUrl: string;
  type: "track" | "album";
  setImage: (value: string) => void;
}

export default function EditImageDialog({ imageUrl, type, setImage }: Props) {
  const [dataUrl, setDataUrl] = useState("");
  const { startUpload } = useUploadThing("trackImage");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onMoveEnd = (cropper: CropperRef) => {
    setDataUrl(cropper.getCanvas()?.toDataURL()!);
  };

  async function upload(dataURL: string) {
    var byteString = atob(dataURL.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: "image/jpg" });

    var file = new File([blob], `${uuidv4()}.jpg`, { type: "image/jpg" });

    setIsLoading(true);
    const res = await startUpload([file]);

    if (!res) {
      return;
    }
    setImage(res[0].url);
    setOpen(false);
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button type="button">Edit image</Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {type} image</DialogTitle>
          <DialogDescription>
            You can crop & resize {type} image
          </DialogDescription>
        </DialogHeader>
        <div className="w-[250px] md:w-[375px]">
          <div className="w-full">
            <Cropper
              src={imageUrl}
              onMoveEnd={onMoveEnd}
              className={"cropper"}
              aspectRatio={{ minimum: 1, maximum: 1 }}
            />
          </div>
          <Button
            variant="secondary"
            className="w-full mt-4"
            loading={isLoading}
            onClick={() => upload(dataUrl)}
          >
            upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
