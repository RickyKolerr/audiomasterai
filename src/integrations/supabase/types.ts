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
      audiobooks: {
        Row: {
          audio_file_path: string | null
          conversion_error: string | null
          created_at: string
          description: string | null
          duration: number | null
          id: string
          original_file_path: string
          status: string
          title: string
          updated_at: string
          user_id: string
          voice_id: string | null
        }
        Insert: {
          audio_file_path?: string | null
          conversion_error?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          original_file_path: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
          voice_id?: string | null
        }
        Update: {
          audio_file_path?: string | null
          conversion_error?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          original_file_path?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          voice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audiobooks_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_attempts: {
        Row: {
          attempt_type: string
          created_at: string
          id: string
          ip_address: string | null
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempt_type: string
          created_at?: string
          id?: string
          ip_address?: string | null
          success: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempt_type?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
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
          voice_conversion_error: string | null
          voice_conversion_status: string | null
          voice_settings: Json | null
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
          voice_conversion_error?: string | null
          voice_conversion_status?: string | null
          voice_settings?: Json | null
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
          voice_conversion_error?: string | null
          voice_conversion_status?: string | null
          voice_settings?: Json | null
        }
        Relationships: []
      }
      chatbot_conversations: {
        Row: {
          category: string | null
          context: Json | null
          created_at: string
          feedback_rating: number | null
          id: string
          message: string
          resolved: boolean | null
          response: string
          sentiment: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          context?: Json | null
          created_at?: string
          feedback_rating?: number | null
          id?: string
          message: string
          resolved?: boolean | null
          response: string
          sentiment?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          context?: Json | null
          created_at?: string
          feedback_rating?: number | null
          id?: string
          message?: string
          resolved?: boolean | null
          response?: string
          sentiment?: string | null
          user_id?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          audiobook_id: string
          downloaded_at: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          audiobook_id: string
          downloaded_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          audiobook_id?: string
          downloaded_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "downloads_audiobook_id_fkey"
            columns: ["audiobook_id"]
            isOneToOne: false
            referencedRelation: "audiobooks"
            referencedColumns: ["id"]
          },
        ]
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
      logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
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
          last_conversion_reset: string | null
          monthly_conversions_used: number | null
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
          last_conversion_reset?: string | null
          monthly_conversions_used?: number | null
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
          last_conversion_reset?: string | null
          monthly_conversions_used?: number | null
          stripe_customer_id?: string | null
          subscription_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          username?: string | null
        }
        Relationships: []
      }
      stripe_prices: {
        Row: {
          created_at: string
          id: number
          plan_name: string
          stripe_price_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          plan_name: string
          stripe_price_id: string
        }
        Update: {
          created_at?: string
          id?: number
          plan_name?: string
          stripe_price_id?: string
        }
        Relationships: []
      }
      stripe_products: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean | null
          price: number
          price_id: string
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          price: number
          price_id: string
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          price?: number
          price_id?: string
          product_id?: string
          updated_at?: string
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
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voices: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          preview_url: string | null
          voice_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          preview_url?: string | null
          voice_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_url?: string | null
          voice_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      app_role: "admin" | "client"
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
