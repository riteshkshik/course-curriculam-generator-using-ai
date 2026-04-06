"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import type { CourseSchemaType } from "@/lib/validations/course";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export async function generateCurriculumAction(params: CourseSchemaType) {
  const { title, description, targetAudience, difficulty } = params;

  try {
    const result = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      schema: z.object({
        overview: z.string(),
        timeEstimate: z.string(),
        modules: z.array(z.object({
          moduleTitle: z.string(),
          moduleDescription: z.string(),
          lessons: z.array(z.object({
            lessonTitle: z.string(),
            keyTakeaways: z.array(z.string()),
          }))
        }))
      }),
      prompt: `Act as an elite Staff-Level Course Architect. You must generate a world-class, extremely detailed, engaging, and professional curriculum.
      Course Title: "${title}"
      Description: "${description}"
      Target Audience: ${targetAudience || 'General Audience'}
      Difficulty: ${difficulty || 'Beginner'}
      
      Generate a practical, step-by-step learning progression. Each module should logically lead to the next.`,
    });

    return result.object;
  } catch (error) {
    console.error("AI Generation Error", error);
    throw new Error("Failed to generate curriculum with AI.");
  }
}
