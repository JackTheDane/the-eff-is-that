import { z } from "zod";
import { slideSchema } from "./schemas";

export type Slide = z.infer<typeof slideSchema>;
