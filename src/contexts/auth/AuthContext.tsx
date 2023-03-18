import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from "react";
import { Session } from "@supabase/auth-js";
import { supabase } from "@/hooks/links";

const SessionContext = createContext<Session | null>(null);

function AuthContext(props: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				setSession(null);
			} else if (session) {
				setSession(session);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<SessionContext.Provider value={session}>
			{props.children}
		</SessionContext.Provider>
	);
}

function useAuth() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

export { AuthContext, useAuth };
