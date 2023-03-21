import { Links } from "@/lib/Database";
import { create } from "zustand";

const NAVBAR_OPTIONS = {
	LINKS: "links",
	NEW_LINK: "new_link",
	PROFILE: "profile"
} as const;

type TAvatar = {
	img?: string;
	file?: File | string;
	fileName?: string;
};

export type GlobalState = {
	user: {
		id: string;
		userName: string;
		email: string;
		avatar: TAvatar;
		setId: (id: string) => void;
		setUserName: (id: string) => void;
		setEmail: (id: string) => void;
		setAvatar: ({
			img,
			file,
			fileName
		}: Partial<TAvatar>) => void;
	};
	links: {
		values: Links[] | [];
		set: (links: Links[]) => void;
	};
	navigation: {
		current: keyof typeof NAVBAR_OPTIONS;
		setCurrentNavigation: (option: keyof typeof NAVBAR_OPTIONS) => void;
	};
};

const useGlobalState = create<GlobalState>()((set) => ({
	user: {
		id: "",
		userName: "",
		email: "",
		avatar: {
			img: "",
			file: "",
			fileName: ""
		},
		setId: function (id) {
			return set((state) => ({ user: { ...state.user, id } }));
		},
		setUserName: (userName) =>
			set((state) => ({ user: { ...state.user, userName } })),
		setEmail: function (email) {
			return set((state) => ({ user: { ...state.user, email } }));
		},
		setAvatar: function (
			{ img, file, fileName } = { img: "", file: "", fileName: "" }
		) {
			return set((state) => {
				return {
					user: {
						...state.user,
						avatar: {
							img,
							file,
							fileName
						}
					}
				};
			});
		}
	},
	links: {
		values: [],
		set: function (links) {
			return set((state) => ({ links: { ...state.links, values: links } }));
		}
	},
	navigation: {
		current: "LINKS",
		setCurrentNavigation: function (option) {
			return set((state) => ({ navigation: { ...state.navigation, current: option } }));
		}
	}
}));

export { useGlobalState, NAVBAR_OPTIONS };
