
export interface Class {
  id: string;
  title: string;
  teacher: string;
  description: string;
  location: string;
  time: string;
  ministry_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClassWithMinistry extends Class {
  ministry?: {
    title: string;
    id: string;
  } | null;
}
