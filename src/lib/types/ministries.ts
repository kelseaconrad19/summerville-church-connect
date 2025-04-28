
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
}

export interface MinistryFormValues {
  title: string;
  image_url: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  description: string;
}
