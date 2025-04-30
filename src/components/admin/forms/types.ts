
export interface Address {
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export type LocationType = "church" | "other";

export interface EventFormData {
  title: string;
  description: string;
  location: Address;
  date_start: Date;
  date_end: Date;
  time_start: string;
  time_end: string;
  image_url: string;
  requires_registration: boolean;
  church_center_url: string;
  event_type: "upcoming" | "ended" | "recurring";
  location_type: LocationType;
  church_location?: string;
  ministry_id?: string;
}

export interface SermonFormData {
  id?: string;
  title: string;
  speaker: string;
  date: Date;
  description?: string;
  series?: string;
  video_url?: string;
  audio_url?: string;
  is_published: boolean;
}

export interface ClassFormData {
  id?: string;
  title: string;
  teacher: string;
  description: string;
  location: string;
  time: string;
  ministry_id: string | null;
  image_url: string | null;
  start_date: Date | null;
  end_date: Date | null;
}
