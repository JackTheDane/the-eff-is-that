import { z } from "zod";

export const slideSchema = z.object({
  id: z.string(),
  answer: z.string().min(1).max(100),
  image: z
    .object({
      src: z.string(),
      height: z.number(),
      width: z.number(),
    })
    .optional(),
  centerOrigin: z.object({
    x: z.number(),
    y: z.number(),
  }),
});
