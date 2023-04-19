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
          is_deletable: boolean | null
          is_public: boolean
          is_shareable: boolean
          opened: boolean | null
          origin: string | null
          posted_date: string | null
          reaction: string | null
          share_with: string[]
          title: string
          url: string | null
          who: string | null
        }
        Insert: {
          by?: string
          id?: string
          is_deletable?: boolean | null
          is_public?: boolean
          is_shareable?: boolean
          opened?: boolean | null
          origin?: string | null
          posted_date?: string | null
          reaction?: string | null
          share_with: string[]
          title?: string
          url?: string | null
          who?: string | null
        }
        Update: {
          by?: string
          id?: string
          is_deletable?: boolean | null
          is_public?: boolean
          is_shareable?: boolean
          opened?: boolean | null
          origin?: string | null
          posted_date?: string | null
          reaction?: string | null
          share_with?: string[]
          title?: string
          url?: string | null
          who?: string | null
        }
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          isAccountPublic: boolean
          updated_at: string | null
          username: string | null
        }
        Insert: {
          full_name?: string | null
          id?: string
          isAccountPublic?: boolean
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          isAccountPublic?: boolean
          updated_at?: string | null
          username?: string | null
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
