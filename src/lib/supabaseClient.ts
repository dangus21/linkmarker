import { Database } from "./types";
import { createClient } from "@supabase/supabase-js";

export const projectId = "https://egjhxxqrsxeeygflvtgx.supabase.co";
export const key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnamh4eHFyc3hlZXlnZmx2dGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMDA4NjIsImV4cCI6MTk5NDY3Njg2Mn0.T2N4uKz-1ze4F8ul-gN0Ai5tEGw_kQMG0fmOZPyvhqo";

export const supabaseClient = createClient<Database>(projectId, key);
