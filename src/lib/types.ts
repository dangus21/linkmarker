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
          isPublic: boolean
          isShareable: boolean
          opened: boolean | null
          origin: string | null
          postedDate: string | null
          reaction: string | null
          shareWith: string[] | null
          title: string
          url: string | null
          who: string | null
        }
        Insert: {
          by: string
          id?: string
          isPublic?: boolean
          isShareable?: boolean
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          reaction?: string | null
          shareWith?: string[] | null
          title: string
          url?: string | null
          who?: string | null
        }
        Update: {
          by?: string
          id?: string
          isPublic?: boolean
          isShareable?: boolean
          opened?: boolean | null
          origin?: string | null
          postedDate?: string | null
          reaction?: string | null
          shareWith?: string[] | null
          title?: string
          url?: string | null
          who?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          isAccountPublic: boolean
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          isAccountPublic?: boolean
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
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
