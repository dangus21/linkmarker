import { z } from "zod";

const envVariables = z.object({
	NODE_ENV: z.string()
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		type ProcessEnv = z.infer<typeof envVariables>;
	}
}