import { z } from "zod";
export const AskResultSchema = z.object({
  summary: z.string().min(100, "Summary cannot be empty"),
  confidence: z.number().min(0).max(1, "Confidence must be between 0 and 1"),
});
export type AskResult = z.infer<typeof AskResultSchema>;
