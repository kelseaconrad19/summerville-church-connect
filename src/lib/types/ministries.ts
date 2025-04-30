
export interface Ministry {
  id: string;
  title: string;
  image_url: string | null;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  involvement_description: string | null;
  involvement_ways: string[] | null;
  activities: string[] | null;
  is_published: boolean | null;
}

export interface MinistryFormValues {
  title: string;
  image_url: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  description: string;
  involvement_description: string;
  involvement_ways: string[];
  activities: string[];
}

