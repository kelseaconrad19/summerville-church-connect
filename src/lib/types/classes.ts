
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
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_published: boolean | null;
}

export interface ClassWithMinistry extends Class {
  ministry?: {
    title: string;
    id: string;
  } | null;
}

