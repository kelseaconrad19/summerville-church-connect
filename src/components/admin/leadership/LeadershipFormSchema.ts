
import { z } from "zod";
import { LeadershipRole } from "@/lib/types/leadership";

export const leadershipSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.enum(["Leadership Team", "Shepherd", "Deacon"] as const, {
    required_error: "Please select a role",
  }),
  ministry: z.string().optional().nullable(),
  bio: z.string().optional().nullable().default(""),
  email: z.string().optional().nullable().or(z.string().email("Invalid email format")),
  image_url: z.string().nullable().optional(),
  display_order: z.number().optional().nullable(),
});

export type LeadershipFormValues = z.infer<typeof leadershipSchema>;
