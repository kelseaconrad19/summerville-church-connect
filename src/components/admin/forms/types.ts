
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
  church_center_url?: string;
  event_type?: "upcoming" | "ended" | "recurring";
  is_recurring?: boolean;
}

export interface Address {
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}
