export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
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
			links_dev: {
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
					is_account_public: boolean;
					is_admin: boolean | null;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					full_name?: string | null;
					id?: string;
					is_account_public?: boolean;
					is_admin?: boolean | null;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					full_name?: string | null;
					id?: string;
					is_account_public?: boolean;
					is_admin?: boolean | null;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;
