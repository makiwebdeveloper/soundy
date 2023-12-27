import { z } from "zod";

export const searchValidator = z.object({
  value: z.string(),
});
export type SearchValidatorType = z.infer<typeof searchValidator>;
