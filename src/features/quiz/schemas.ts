import { z } from "zod";
import { slideSchema } from "../slides/schemas";

export const quizSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slides: z.array(slideSchema),
});
