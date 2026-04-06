"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createCourse(data: {
  title: string;
  description: string;
  targetAudience?: string;
  difficulty?: string;
  curriculum?: any;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const course = await prisma.course.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");
  return course;
}

export async function getCourses() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.course.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });
}

export async function generateAICurriculum(promptText: string) {
  // This will be implemented using Vercel AI SDK on the server
  // Placeholder returning structure.
  console.log("generateAICurriculum placeholder");
}
