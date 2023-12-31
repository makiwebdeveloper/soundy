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
import { ChevronDown, ChevronUp, Info, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formatTime } from "@/utils/format-time";
import * as mm from "music-metadata-browser";

interface Props {
  audioFiles: AudioFileType[];
  cancel: () => void;
  profileId: number;
}

export default function UploadAlbumForm({
  audioFiles,
  cancel,
  profileId,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [customGenre, setCustomGenre] = useState("");
  const [tracks, setTracks] = useState(audioFiles);
  const [tracksDuration, setTracksDuration] = useState<
    { url: string; duration: string }[]
  >([]);

  const form = useForm<UploadAlbumValidatorType>({
    resolver: zodResolver(uploadAlbumValidator),
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      genre: "",
    },
  });

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
        audioDurations: tracksDuration,
      };
      const res = await createAlbum(data);
      router.push(`/profiles/${profileId}/albums/${res.data.albumId}`);
    }
  }

  useEffect(() => {
    if (tracks.length === 0) {
      cancel();
    }
  }, [tracks]);

  function removeTrack(position: number, url: string) {
    let tracksArray = tracks.filter((f) => f.position !== position);
    setTracksDuration((prev) => prev.filter((t) => t.url !== url));
    for (let i = 0; i < tracksArray.length; i++) {
      if (i >= position) {
        tracksArray[i].position -= 1;
      }
    }
    setTracks(tracksArray);
  }

  useEffect(() => {
    async function fun() {
      const array = [];
      for (let i = 0; i < tracks.length; i++) {
        const metadata = await mm.fetchFromUrl(tracks[i].url);
        array.push({
          url: tracks[i].url,
          duration: formatTime(Math.floor(metadata.format.duration || 0)),
        });
      }

      setTracksDuration(array);
    }

    fun();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="imageUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album image *</FormLabel>
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
              <FormLabel>Title *</FormLabel>
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
            {tracks
              .sort((a, b) => a.position - b.position)
              .map((track) => (
                <div key={track.url} className="flex gap-2">
                  <div className="flex gap-2">
                    <Button
                      border
                      type="button"
                      disabled={track.position === 0}
                      onClick={() =>
                        setTracks((prev) =>
                          prev.map((f) =>
                            f.position === track.position
                              ? { ...f, position: track.position - 1 }
                              : f.position === track.position - 1
                              ? { ...f, position: f.position + 1 }
                              : f
                          )
                        )
                      }
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button
                      border
                      type="button"
                      disabled={
                        track.position === tracks[tracks.length - 1].position
                      }
                      onClick={() =>
                        setTracks((prev) =>
                          prev.map((f) =>
                            f.position === track.position
                              ? { ...f, position: track.position + 1 }
                              : f.position === track.position + 1
                              ? { ...f, position: f.position - 1 }
                              : f
                          )
                        )
                      }
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    border
                    value={track.name}
                    onChange={(e) =>
                      setTracks((prev) =>
                        prev.map((f) =>
                          f.url === track.url
                            ? { ...f, name: e.target.value }
                            : f
                        )
                      )
                    }
                  />
                  <Button
                    type="button"
                    border
                    onClick={() => removeTrack(track.position, track.url)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <CancelUploadDialog cancel={cancel} />
          <Button
            type="submit"
            variant="secondary"
            loading={isLoading || tracksDuration.length !== tracks.length}
          >
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
}
