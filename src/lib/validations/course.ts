import { z } from "zod";

export const CourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000, "Description is too long"),
  targetAudience: z.string().min(3, "Please specify a target audience").optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Please select a difficulty level.",
  }).optional(),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
