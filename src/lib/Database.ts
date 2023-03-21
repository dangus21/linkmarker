type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export type Profiles = {
	id: string;
	updated_at: string | null;
	username: string | null;
	full_name: string | null;
	avatar_url: string | null;
	website: string | null;
};

export type Links = {
	id: string;
	title: string;
	origin: string;
	who: string;
	postedDate: Date;
	opened: string;
	by: string;
};

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: Profiles;
				Insert: WithRequired<Partial<Profiles>, "id">;
				Update: WithRequired<Partial<Profiles>, "id">;
			};
			links: {
				Row: Links;
				Insert: WithRequired<Partial<Links>, "id">;
				Update: WithRequired<Partial<Links>, "id">;
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
	};
};