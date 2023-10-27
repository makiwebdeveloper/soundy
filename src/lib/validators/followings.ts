import { z } from "zod";

export const followProfileValidator = z.object({
  profileId: z.number(),
});
export type FollowProfileValidatorType = z.infer<typeof followProfileValidator>;
