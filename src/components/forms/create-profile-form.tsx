"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProfileValidatorType,
  createProfileValidator,
} from "@/lib/validators/profiles";
import { ProfileImageUploader } from "@/components/uploaders";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function CreateProfileForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateProfileValidatorType>({
    resolver: zodResolver(createProfileValidator),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: CreateProfileValidatorType) {
    try {
      setIsLoading(true);
      await axios.post("/api/profiles", { ...values });
      toast({
        title: "Successfully created profile",
        variant: "success",
      });
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Failed to create profile",
        variant: "destructive",
      });
      setIsLoading(false);
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
        <Button loading={isLoading} type="submit" className="mt-3 w-full">
          Create
        </Button>
      </form>
    </Form>
  );
}
