
export type LeadershipRole = "Leadership Team" | "Shepherd" | "Deacon";

export interface LeadershipMember {
  id: string;
  name: string;
  role: LeadershipRole;
  ministry?: string | null;
  bio: string;
  image_url: string | null;
  email?: string | null;
  created_at: string;
  updated_at: string;
}
