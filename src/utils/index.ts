import { create } from "zustand";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

enum NAVBAR_OPTIONS {
	LINKS = "links",
	PROFILE = "profile"
};

type GlobalState = {
	user: {
		id: string;
		userName: string;
		email: string | undefined;
		avatar: string;
		setId: (id: string) => void;
		setUserName: (id: string) => void;
		setEmail: (id: string | undefined) => void;
		setAvatar: (id: string) => void;
	};
	navigation: NAVBAR_OPTIONS;
};

const useGlobalState = create<GlobalState>()(
	(set) => ({
		user: {
			id: "",
			userName: "",
			email: "",
			avatar: "",
			setId: (id) => set((state) => ({ user: { ...state.user, id } })),
			setUserName: (userName) => set((state) => ({ user: { ...state.user, userName } })),
			setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
			setAvatar: (avatar) => set((state) => ({ user: { ...state.user, avatar } }))
		},
		navigation: NAVBAR_OPTIONS.LINKS
	})
);

export { classNames, NAVBAR_OPTIONS, useGlobalState };