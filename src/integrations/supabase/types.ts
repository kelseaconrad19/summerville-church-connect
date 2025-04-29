export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          ministry_id: string | null
          teacher: string
          time: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          ministry_id?: string | null
          teacher: string
          time: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          ministry_id?: string | null
          teacher?: string
          time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_ministry_id_fkey"
            columns: ["ministry_id"]
            isOneToOne: false
            referencedRelation: "ministries"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          church_center_url: string | null
          created_at: string
          created_by: string
          date_end: string
          date_start: string
          description: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          is_recurring: boolean | null
          location: string | null
          max_attendees: number | null
          recurrence_pattern: string | null
          requires_registration: boolean | null
          time_end: string | null
          time_start: string | null
          title: string
          updated_at: string
        }
        Insert: {
          church_center_url?: string | null
          created_at?: string
          created_by: string
          date_end: string
          date_start: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_attendees?: number | null
          recurrence_pattern?: string | null
          requires_registration?: boolean | null
          time_end?: string | null
          time_start?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          church_center_url?: string | null
          created_at?: string
          created_by?: string
          date_end?: string
          date_start?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_attendees?: number | null
          recurrence_pattern?: string | null
          requires_registration?: boolean | null
          time_end?: string | null
          time_start?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events_attendees: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          status: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          status?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      ministries: {
        Row: {
          activities: Json | null
          contact_email: string
          contact_first_name: string
          contact_last_name: string
          created_at: string
          created_by: string
          description: string
          id: string
          image_url: string | null
          involvement_description: string | null
          involvement_ways: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          activities?: Json | null
          contact_email: string
          contact_first_name: string
          contact_last_name: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          image_url?: string | null
          involvement_description?: string | null
          involvement_ways?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          activities?: Json | null
          contact_email?: string
          contact_first_name?: string
          contact_last_name?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          image_url?: string | null
          involvement_description?: string | null
          involvement_ways?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          audio_url: string | null
          created_at: string
          created_by: string
          date: string
          description: string | null
          id: string
          is_published: boolean | null
          series: string | null
          speaker: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          created_by: string
          date: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          series?: string | null
          speaker: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          created_by?: string
          date?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          series?: string | null
          speaker?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      promote_to_admin: {
        Args: { target_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
