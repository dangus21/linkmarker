import { z } from "zod";

const envVariables = z.object({
	NODE_ENV: z.string(),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	NEXT_PUBLIC_TOGGLE_ARCHIVE: z.union([z.literal("on"), z.literal("off")]),
	NEXT_PUBLIC_TOGGLE_SEEN: z.union([z.literal("on"), z.literal("off")]),
	NEXT_PUBLIC_TOGGLE_REACTIONS: z.union([z.literal("on"), z.literal("off")]),
	NEXT_PUBLIC_TOGGLE_DELETE: z.union([z.literal("on"), z.literal("off")]),
	NEXT_PUBLIC_TOGGLE_DELETE_ON_CREATE: z.union([
		z.literal("on"),
		z.literal("off"),
	]),
	NEXT_PUBLIC_TOGGLE_EDIT: z.union([z.literal("on"), z.literal("off")]),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		export interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
