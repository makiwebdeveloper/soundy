import { z } from "zod";

export const uploadTrackValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  genre: z.string().optional(),
  isPublic: z.boolean(),
  imageUrl: z.string().min(1, "Image is required"),
  audioUrl: z.string().min(1),
  duration: z.string().optional(),
});
export type UploadTrackValidatorType = z.infer<typeof uploadTrackValidator>;

export const playTrackValidator = z.object({
  trackId: z.number(),
  albumId: z.number().optional(),
  playlistId: z.number().optional(),
  favoritesProfileId: z.number().optional(),
  tracksProfileId: z.number().optional(),
  history: z.boolean().optional(),
});
export type PlayTrackValidatorType = z.infer<typeof playTrackValidator>;

export const favoriteTrackValidator = z.object({
  trackId: z.number(),
});
export type FavoriteTrackValidatorType = z.infer<typeof favoriteTrackValidator>;

export const editTrackValidator = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  genre: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type EditTrackValidatorType = z.infer<typeof editTrackValidator>;
