import { z } from "zod";

export const uploadAlbumValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  genre: z.string().optional(),
  imageUrl: z.string().min(1, "Image is required"),
  audioFiles: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        url: z.string().min(1, "Url is required"),
        position: z.number().min(0),
      })
    )
    .optional(),
  audioDurations: z
    .array(
      z.object({
        url: z.string(),
        duration: z.string(),
      })
    )
    .optional(),
});
export type UploadAlbumValidatorType = z.infer<typeof uploadAlbumValidator>;

export const editAlbumValidator = z.object({
  imageUrl: z.string().optional(),
  title: z.string().optional(),
});
export type EditAlbumValidatorType = z.infer<typeof editAlbumValidator>;
