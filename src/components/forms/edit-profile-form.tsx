"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileType } from "@/types/profiles.types";
import {
  EditProfileValidatorType,
  editProfileValidator,
} from "@/lib/validators/profiles";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ProfileImageUploader } from "@/components/uploaders";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  profile: Pick<ProfileType, "id" | "name" | "imageUrl">;
  close: () => void;
}

export default function EditProfileForm({ profile, close }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<EditProfileValidatorType>({
    resolver: zodResolver(editProfileValidator),
    defaultValues: {
      name: profile.name,
      imageUrl: profile.imageUrl,
    },
  });

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (values: EditProfileValidatorType) => {
      await axios.patch(`/api/profiles/${profile.id}`, { ...values });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`profile ${profile.id}`]);
      toast({
        title: "Successfully edited profile",
        variant: "success",
      });
      close();
    },
    onError: () => {
      toast({
        title: "Failed to edit profile",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: EditProfileValidatorType) {
    if (
      (profile.name === values.name && profile.imageUrl === values.imageUrl) ||
      (!values.name && !values.imageUrl)
    ) {
      close();
    } else {
      updateProfile(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile image</FormLabel>
              <FormControl>
                <ProfileImageUploader
                  image={field.value || ""}
                  setImage={(v: string) => field.onChange(v)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Profile name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="write your profile name"
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
