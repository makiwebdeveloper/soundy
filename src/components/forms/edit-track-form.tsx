"use client";

import { useToast } from "@/hooks/use-toast";
import {
  EditTrackValidatorType,
  editTrackValidator,
} from "@/lib/validators/tracks";
import { FullTrackType } from "@/types/tracks.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackImageUploader } from "../uploaders";
import { Combobox } from "../ui/combobox";
import { genres } from "@/utils/default-genres";
import { useState } from "react";

interface Props {
  track: Pick<
    FullTrackType,
    "id" | "title" | "imageUrl" | "description" | "genre"
  >;
  close: () => void;
}

export default function EditTrackForm({ track, close }: Props) {
  const [customGenre, setCustomGenre] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<EditTrackValidatorType>({
    resolver: zodResolver(editTrackValidator),
    defaultValues: {
      title: track.title,
      description: track.description || "",
      genre: genres.find((genre) => genre === track.genre)
        ? track.genre
          ? track.genre
          : undefined
        : "Custom",
      imageUrl: track.imageUrl,
    },
  });

  const { mutate: updateTrack, isLoading } = useMutation({
    mutationFn: async (values: EditTrackValidatorType) => {
      await axios.patch(`/api/tracks/${track.id}`, {
        title: values.title || undefined,
        description: values.description || undefined,
        genre: values.genre === "Custom" ? customGenre : values.genre,
        imageUrl: values.imageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`track ${track.id}`]);
      close();
      toast({
        title: "Successfully edited track",
        variant: "success",
      });
    },
    onError: () => {
      close();
      toast({
        title: "Failed to edit track",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => updateTrack(values))}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile image</FormLabel>
              <FormControl>
                <TrackImageUploader
                  image={field.value || ""}
                  setImage={(v: string) => field.onChange(v)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="write your track title"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="write your track description"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
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
        <Button loading={isLoading} type="submit" className="mt-3 w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
