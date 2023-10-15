"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  CreatePlaylistValidatorType,
  createPlaylistValidator,
} from "@/lib/validators/playlists";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  close: () => void;
  trackId: number;
}

export default function CreatePlaylistForm({ close, trackId }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<CreatePlaylistValidatorType>({
    resolver: zodResolver(createPlaylistValidator),
    defaultValues: {
      title: "",
      isPublic: true,
      trackId,
    },
  });

  const { mutate: createPlaylist } = useMutation({
    mutationFn: async (data: CreatePlaylistValidatorType) => {
      await axios.post("/api/playlists", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
      close();
      toast({
        title: "Successfully created playlist",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to create playlist",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: CreatePlaylistValidatorType) {
    createPlaylist(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-[330px] flex flex-col justify-between"
      >
        <div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Playlist title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="write title for playlist"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="mt-5">
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
        </div>
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
}
