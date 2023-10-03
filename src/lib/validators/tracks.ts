import { z } from "zod";

export const uploadTrackValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  genre: z.string().optional(),
  isPublic: z.boolean(),
  imageUrl: z.string().min(1, "Image is required"),
  audioUrl: z.string().min(1),
});
export type UploadTrackValidatorType = z.infer<typeof uploadTrackValidator>;
