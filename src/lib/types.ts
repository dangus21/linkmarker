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
          id: string
          opened: boolean | null
          origin: string | null
          postedDate: string | null
          reaction: string | null
          title: string | null
          url: string | null
          who: string | null
        }
        Insert: {
          id: string
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          reaction?: string | null
          title?: string | null
          url?: string | null
          who?: string | null
        }
        Update: {
          id?: string
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          reaction?: string | null
          title?: string | null
          url?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
