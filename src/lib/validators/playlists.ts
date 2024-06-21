import { z } from "zod";

export const createPlaylistValidator = z.object({
  title: z.string().min(1, "Title is required"),
  isPublic: z.boolean(),
  trackId: z.number(),
});
export type CreatePlaylistValidatorType = z.infer<
  typeof createPlaylistValidator
>;

export const addToPlaylistValidator = z.object({
  playlistId: z.number(),
  trackId: z.number(),
});
export type AddToPlaylistValidatorType = z.infer<typeof addToPlaylistValidator>;

export const deleteFromPlaylistValidator = z.object({
  playlistId: z.number(),
  trackId: z.number(),
});
export type DeleteFromValidatorType = z.infer<
  typeof deleteFromPlaylistValidator
>;

export const editPlaylistValidator = z.object({
  title: z.string().optional(),
});
export type EditPlaylistValidatorType = z.infer<typeof editPlaylistValidator>;
