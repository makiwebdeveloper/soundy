"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UploadTrackValidatorType,
  uploadTrackValidator,
} from "@/lib/validators/tracks";
import { genres } from "@/utils/default-genres";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { AudioFileType } from "@/types/tracks.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrackImageUploader } from "@/components/uploaders";
import { CancelUploadDialog } from "@/components/dialogs";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Props {
  track: AudioFileType;
  cancel: () => void;
}

export default function UploadTrackForm({ track, cancel }: Props) {
  const { toast } = useToast();

  const form = useForm<UploadTrackValidatorType>({
    resolver: zodResolver(uploadTrackValidator),
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      genre: "",
      isPublic: true,
      audioUrl: track.url,
    },
  });
  const [customGenre, setCustomGenre] = useState("");

  const { mutateAsync: createTrack, isLoading } = useMutation({
    mutationFn: async (data: UploadTrackValidatorType) => {
      const res = await axios.post<{ trackId: number }>("/api/tracks", data);
      return res;
    },

    onSuccess: (data) => {
      toast({
        title: "Successfully created track",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed track creation",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: UploadTrackValidatorType) {
    const data: UploadTrackValidatorType = {
      ...values,
      genre: values.genre === "Custom" ? customGenre : values.genre,
    };
    const res = await createTrack(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="imageUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Track image</FormLabel>
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
                  placeholder="write title for track"
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
                  placeholder="write description for track"
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
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(e) => field.onChange(e === "true")}
                  defaultValue={field.value.toString()}
                >
                  <FormItem>
                    <FormControl>
                      <div className="flex items-cen gap-2 cursor-pointer w-fit pl-2 pr-3 py-1 rounded-md transition hover:bg-white/10 dark:hover:bg-black/30">
                        <RadioGroupItem value={"true"} id="public" />
                        <Label
                          htmlFor="public"
                          className="text-white cursor-pointer"
                        >
                          public
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <div className="flex items-cen gap-2 cursor-pointer w-fit pl-2 pr-3 py-1 rounded-md transition hover:bg-white/10 dark:hover:bg-black/30">
                        <RadioGroupItem value={"false"} id="private" />
                        <Label
                          htmlFor="private"
                          className="text-white cursor-pointer"
                        >
                          private
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <CancelUploadDialog cancel={cancel} />
          <Button variant="secondary" loading={isLoading}>
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
}
