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
import { PlaylistWithTracksType } from "@/types/playlists.types";
import {
  EditPlaylistValidatorType,
  editPlaylistValidator,
} from "@/lib/validators/playlists";

interface Props {
  playlist: PlaylistWithTracksType;
  close: () => void;
}

export default function EditPlaylistForm({ playlist, close }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<EditPlaylistValidatorType>({
    resolver: zodResolver(editPlaylistValidator),
    defaultValues: {
      title: playlist.title,
    },
  });

  const { mutate: updatePlaylistTitle, isLoading: isUpdateTitleLoading } =
    useMutation({
      mutationFn: async (values: EditPlaylistValidatorType) => {
        await axios.patch(`/api/playlists/${playlist.id}`, {
          title: values.title || undefined,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([`playlist ${playlist.id}`]);
        close();
        toast({
          title: "Successfully edited playlist",
          variant: "success",
        });
      },
      onError: () => {
        close();
        toast({
          title: "Failed to edit playlist",
          variant: "destructive",
        });
      },
    });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => updatePlaylistTitle(values))}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="write your playlist title"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          loading={isUpdateTitleLoading}
          type="submit"
          className="mt-3 w-full"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
