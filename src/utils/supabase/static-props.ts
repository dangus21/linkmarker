import type { Database } from "@/lib/types";
import { createClient as createClientPrimitive } from "@supabase/supabase-js";

function createClient() {
	const supabase = createClientPrimitive<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	return supabase;
}

export { createClient };
