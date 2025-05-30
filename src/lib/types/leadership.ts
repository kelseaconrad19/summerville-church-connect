
export type LeadershipRole = "Leadership Team" | "Shepherd" | "Deacon";

export interface LeadershipMember {
  id: string;
  name: string;
  role: LeadershipRole;
  ministry?: string | null;
  bio?: string | null;
  image_url: string | null;
  email?: string | null;
  display_order?: number | null;
  created_at: string;
  updated_at: string;
}
