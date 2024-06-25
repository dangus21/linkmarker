import { z } from "zod";

const envVariables = z.object({
	NODE_ENV: z.string(),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	TOGGLE_ARCHIVE: z.string(),
	TOGGLE_SEEN: z.string(),
	TOGGLE_REACTIONS: z.string(),
	TOGGLE_DELETE: z.string(),
	TOGGLE_EDIT: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		type ProcessEnv = z.infer<typeof envVariables>;
	}
}
