export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			links: {
				Row: {
					archived: boolean;
					by: string;
					id: string;
					is_archivable: boolean;
					is_deletable: boolean;
					is_public: boolean;
					is_shareable: boolean;
					opened: boolean;
					origin: string;
					posted_date: string;
					reaction: string | null;
					share_with: string[];
					title: string;
					url: string;
					who: string;
				};
				Insert: {
					archived?: boolean;
					by?: string;
					id?: string;
					is_archivable?: boolean;
					is_deletable?: boolean;
					is_public?: boolean;
					is_shareable?: boolean;
					opened?: boolean;
					origin?: string;
					posted_date?: string;
					reaction?: string | null;
					share_with: string[];
					title?: string;
					url?: string;
					who?: string;
				};
				Update: {
					archived?: boolean;
					by?: string;
					id?: string;
					is_archivable?: boolean;
					is_deletable?: boolean;
					is_public?: boolean;
					is_shareable?: boolean;
					opened?: boolean;
					origin?: string;
					posted_date?: string;
					reaction?: string | null;
					share_with?: string[];
					title?: string;
					url?: string;
					who?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					full_name: string | null;
					id: string;
					isAccountPublic: boolean;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					full_name?: string | null;
					id?: string;
					isAccountPublic?: boolean;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					full_name?: string | null;
					id?: string;
					isAccountPublic?: boolean;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
