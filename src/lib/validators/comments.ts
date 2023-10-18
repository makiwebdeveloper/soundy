import { z } from "zod";

export const createCommentValidator = z.object({
  text: z.string().min(1),
  trackId: z.number(),
});
export type CreateCommentValidatorType = z.infer<typeof createCommentValidator>;
