"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { genres } from "@/utils/default-genres";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { AudioFileType } from "@/types/tracks.types";
import { TrackImageUploader } from "@/components/uploaders";
import { CancelUploadDialog } from "@/components/dialogs";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  UploadAlbumValidatorType,
  uploadAlbumValidator,
} from "@/lib/validators/albums";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Props {
  audioFiles: AudioFileType[];
  cancel: () => void;
}

export default function UploadAlbumForm({ audioFiles, cancel }: Props) {
  const { toast } = useToast();

  const form = useForm<UploadAlbumValidatorType>({
    resolver: zodResolver(uploadAlbumValidator),
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      genre: "",
    },
  });
  const [customGenre, setCustomGenre] = useState("");
  const [tracks, setTracks] = useState(audioFiles);

  const { mutateAsync: createAlbum, isLoading } = useMutation({
    mutationFn: async (data: UploadAlbumValidatorType) => {
      const res = await axios.post<{ albumId: number }>("/api/albums", data);
      return res;
    },

    onSuccess: (data) => {
      toast({
        title: "Successfully created ablum",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed ablum creation",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: UploadAlbumValidatorType) {
    if (tracks.every((f) => f.name)) {
      const data: UploadAlbumValidatorType = {
        ...values,
        genre: values.genre === "Custom" ? customGenre : values.genre,
        audioFiles: tracks,
      };
      const res = await createAlbum(data);
    }
  }

  useEffect(() => {
    if (tracks.length === 0) {
      cancel();
    }
  }, [tracks]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="imageUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album image</FormLabel>
              <FormControl>
                <TrackImageUploader
                  image={field.value}
                  setImage={(v: string) => field.onChange(v)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="write title for album"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="write description for album"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="genre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Combobox
                    name="genre"
                    values={genres}
                    selectedValue={field.value || ""}
                    setSelectedValue={(v: string) => field.onChange(v)}
                  />
                  {field.value === "Custom" && (
                    <Input
                      placeholder="write custom genre"
                      value={customGenre}
                      onChange={(e) => setCustomGenre(e.target.value)}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Label className="flex gap-2 items-center mb-2">
            <span
              className={cn(!tracks.every((f) => f.name) && "text-red-500")}
            >
              Tracks
            </span>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-5 h-5 cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p>You can edit tracks</p>
                <p className="text-black/50 dark:text-white/50">
                  change name of tracks, their position or remove
                </p>
              </HoverCardContent>
            </HoverCard>
          </Label>
          <div className="space-y-2">
            {tracks.map((track) => (
              <div key={track.url} className="flex gap-2">
                <Input
                  border
                  value={track.name}
                  onChange={(e) =>
                    setTracks((prev) =>
                      prev.map((f) =>
                        f.url === track.url ? { ...f, name: e.target.value } : f
                      )
                    )
                  }
                />
                <Button
                  type="button"
                  border
                  onClick={() =>
                    setTracks(tracks.filter((f) => f.url !== track.url))
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <CancelUploadDialog cancel={cancel} />
          <Button type="submit" variant="secondary" loading={isLoading}>
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
}
