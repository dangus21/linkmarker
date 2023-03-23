import { Database } from "@/lib/types";
import { create } from "zustand";

const NAVBAR_OPTIONS = {
	LINKS: "links",
	NEW_LINK: "new_link",
	PROFILE: "profile"
} as const;

type TAvatar = {
	img?: string;
	file: File | null;
	fileName?: string;
};

export type TLink = Database["public"]["Tables"]["links"]["Row"];
export type TLinkUpdate = Database["public"]["Tables"]["links"]["Update"];

export type GlobalState = {
	user: {
		id: string;
		userName: string;
		email: string;
		password: string;
		avatar: TAvatar;
		modified: boolean;
		setModified: (isModified: boolean) => void;
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
		values: TLink[] | [];
		new: TLinkUpdate;
		set: (links: TLink[]) => void;
		update: (link: TLink) => void;
		create: (link: TLinkUpdate) => void;
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
		password: "",
		avatar: {
			img: "",
			file: null,
			fileName: ""
		},
		modified: false,
		setModified: function (isModified) {
			return set(state => ({
				user: {
					...state.user,
					modified: isModified
				}
			}));
		},
		setId: function (id) {
			return set((state) => ({
				user: {
					...state.user,
					id
				}
			}));
		},
		setUserName: function (userName) {
			return set((state) => ({
				user: {
					...state.user,
					userName
				}
			}));
		},
		setEmail: function (email) {
			return set((state) => ({
				user: {
					...state.user,
					email
				}
			}));
		},
		setAvatar: function (
			{ img, file, fileName } = { img: "", file: null, fileName: "" }
		) {
			return set((state) => {
				return {
					user: {
						...state.user,
						avatar: {
							img,
							file: file || null,
							fileName
						}
					}
				};
			});
		}
	},
	links: {
		values: [],
		new: {},
		set: function (links) {
			return set((state) => ({
				links: {
					...state.links,
					values: links
				}
			}));
		},
		create: function (link) {
			return set((state) => ({
				links: {
					...state.links,
					new: {
						...state.links.new,
						...link
					}
				}
			}));
		},
		update: function (link) {
			return set((state) => {
				const currentLinks = structuredClone(state.links.values);
				const updateLinkIdx = currentLinks.findIndex(el => el.id === link.id);
				currentLinks[updateLinkIdx] = link;

				return ({ links: { ...state.links, values: currentLinks } });
			});
		}
	},
	navigation: {
		current: "LINKS",
		setCurrentNavigation: function (option) {
			return set((state) => ({
				navigation: {
					...state.navigation,
					current: option
				}
			}));
		}
	}
}));

export { useGlobalState, NAVBAR_OPTIONS };
