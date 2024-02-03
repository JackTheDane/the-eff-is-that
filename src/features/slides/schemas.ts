import { z } from "zod";

export const slideSchema = z.object({
  id: z.string(),
  answer: z.string().min(1).max(100),
  imageSrc: z.string(),
  centerOrigin: z.object({
    x: z.number(),
    y: z.number(),
  }),
});
