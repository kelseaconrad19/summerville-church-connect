
import { z } from "zod";

export const classSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  teacher: z.string().min(1, { message: "Teacher name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  ministry_id: z.string().nullable(),
  image_url: z.string().nullable(),
  start_date: z.date().nullable(),
  end_date: z.date().nullable(),
  is_published: z.boolean().default(false)
});

export type ClassFormValues = z.infer<typeof classSchema>;
