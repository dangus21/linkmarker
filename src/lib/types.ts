export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          by: string
          id: string
          opened: boolean | null
          origin: string | null
          postedDate: string | null
          public: boolean | null
          title: string | null
          who: string | null
        }
        Insert: {
          by: string
          id: string
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          public?: boolean | null
          title?: string | null
          who?: string | null
        }
        Update: {
          by?: string
          id?: string
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          public?: boolean | null
          title?: string | null
          who?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
