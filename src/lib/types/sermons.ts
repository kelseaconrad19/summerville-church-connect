
export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string | Date;
  description?: string;
  series?: string;
  video_url?: string;
  audio_url?: string;
  is_published: boolean;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface SermonError {
  message: string;
  [key: string]: any;
}
