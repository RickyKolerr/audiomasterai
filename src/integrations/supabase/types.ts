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
      admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          content_type: string
          conversion_error: string | null
          converted_audio_path: string | null
          created_at: string
          file_path: string
          file_size: number
          id: string
          original_filename: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content_type: string
          conversion_error?: string | null
          converted_audio_path?: string | null
          created_at?: string
          file_path: string
          file_size: number
          id?: string
          original_filename: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content_type?: string
          conversion_error?: string | null
          converted_audio_path?: string | null
          created_at?: string
          file_path?: string
          file_size?: number
          id?: string
          original_filename?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: string
          message: string
          rating: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          rating: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      language_tokens: {
        Row: {
          created_at: string
          english: string
          id: string
          key: string
          vietnamese: string
        }
        Insert: {
          created_at?: string
          english: string
          id?: string
          key: string
          vietnamese: string
        }
        Update: {
          created_at?: string
          english?: string
          id?: string
          key?: string
          vietnamese?: string
        }
        Relationships: []
      }
      premium_voices: {
        Row: {
          created_at: string
          description: string
          id: string
          is_premium: boolean | null
          name: string
          preview_url: string | null
          voice_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_premium?: boolean | null
          name: string
          preview_url?: string | null
          voice_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_url?: string | null
          voice_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          stripe_customer_id: string | null
          subscription_id: string | null
          subscription_plan: string | null
          subscription_status: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          stripe_customer_id?: string | null
          subscription_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          subscription_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          username?: string | null
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          content_type: string
          conversion_error: string | null
          converted_audio_path: string | null
          created_at: string
          description: string | null
          file_path: string
          file_size: number
          id: string
          status: string
          title: string
          updated_at: string
          user_id: string
          voice_settings: Json | null
        }
        Insert: {
          content_type: string
          conversion_error?: string | null
          converted_audio_path?: string | null
          created_at?: string
          description?: string | null
          file_path: string
          file_size: number
          id?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
          voice_settings?: Json | null
        }
        Update: {
          content_type?: string
          conversion_error?: string | null
          converted_audio_path?: string | null
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number
          id?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          voice_settings?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_plan_type: "free" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
