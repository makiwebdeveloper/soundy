"use client";

import "@uploadthing/react/styles.css";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProfileValidatorType,
  createProfileValidator,
} from "@/lib/validators/profile";
import ProfileImageUploader from "../uploaders/profile-image-uploader";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CreateProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateProfileValidatorType>({
    resolver: zodResolver(createProfileValidator),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: CreateProfileValidatorType) {
    try {
      await axios.post("/api/profiles", { ...values });
      toast({
        title: "Successfully created profile",
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Failed to create profile",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile image</FormLabel>
              <FormControl>
                <ProfileImageUploader
                  image={field.value}
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
        <Button type="submit" className="mt-3 w-full">
          Create
        </Button>
      </form>
    </Form>
  );
}
