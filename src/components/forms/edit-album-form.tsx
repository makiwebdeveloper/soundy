"use client";

import { useToast } from "@/hooks/use-toast";
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
import { FullAlbumType } from "@/types/albums.types";
import {
  EditAlbumValidatorType,
  editAlbumValidator,
} from "@/lib/validators/albums";

interface Props {
  album: Pick<FullAlbumType, "id" | "title" | "imageUrl">;
  close: () => void;
}

export default function EditAlbumForm({ album, close }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<EditAlbumValidatorType>({
    resolver: zodResolver(editAlbumValidator),
    defaultValues: {
      title: album.title,
      imageUrl: album.imageUrl,
    },
  });

  const { mutate: updateAlbum, isLoading } = useMutation({
    mutationFn: async (values: EditAlbumValidatorType) => {
      await axios.patch(`/api/albums/${album.id}`, {
        title: values.title || undefined,
        imageUrl: values.imageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`album ${album.id}`]);
      close();
      toast({
        title: "Successfully edited album",
        variant: "success",
      });
    },
    onError: () => {
      close();
      toast({
        title: "Failed to edit album",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => updateAlbum(values))}>
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
        <Button loading={isLoading} type="submit" className="mt-3 w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
