import { z } from "zod";

const envVariables = z.object({
	NODE_ENV: z.string(),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	NEXT_PUBLIC_TOGGLE_ARCHIVE: z.string(),
	NEXT_PUBLIC_TOGGLE_SEEN: z.string(),
	NEXT_PUBLIC_TOGGLE_REACTIONS: z.string(),
	NEXT_PUBLIC_TOGGLE_DELETE: z.string(),
	NEXT_PUBLIC_TOGGLE_DELETE_ON_CREATE: z.string(),
	NEXT_PUBLIC_TOGGLE_EDIT: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		export interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
