"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreateCommentValidatorType,
  createCommentValidator,
} from "@/lib/validators/comments";
import { Button } from "../ui/button";
import { SendIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Props {
  trackId: number;
}

export default function SendCommentForm({ trackId }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<CreateCommentValidatorType>({
    resolver: zodResolver(createCommentValidator),
    defaultValues: {
      text: "",
      trackId,
    },
  });

  const { mutate: sendComment, isLoading } = useMutation({
    mutationFn: async (values: CreateCommentValidatorType) => {
      await axios.post("/api/comments", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`track ${trackId} comments`]);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send comment",
        variant: "destructive",
      });
      form.reset();
    },
  });

  async function onSubmit(values: CreateCommentValidatorType) {
    sendComment(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input id="text" placeholder="write a comment" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex gap-2"
          disabled={form.getFieldState("text").invalid}
          loading={isLoading}
        >
          <span className="hidden sm:block">Send</span>{" "}
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
