import { z } from "zod";

export const createProfileValidator = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required.",
  }),
  name: z.string().min(1, "Profile name is required."),
});
export type CreateProfileValidatorType = z.infer<typeof createProfileValidator>;
