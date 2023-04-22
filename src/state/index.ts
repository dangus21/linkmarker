import { Database } from "@/lib/types";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

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
export type TLinkNew = Database["public"]["Tables"]["links"]["Insert"];
export type TLinkUpdate = Database["public"]["Tables"]["links"]["Update"];

export type UserState = {
	id: string;
	userName: string;
	email: string;
	password: string;
	avatar: TAvatar;
	modified: boolean;
	is_public: boolean;
	setis_public: (is_public: boolean) => void;
	setModified: (isModified: boolean) => void;
	setId: (id: string) => void;
	setUserName: (id: string) => void;
	setEmail: (id: string) => void;
	setAvatar: ({ img, file, fileName }: Partial<TAvatar>) => void;
};

export enum TABS {
	ALL,
	MINE,
	SHARED,
	PRIVATE
}

export type User = {
	id: Database["public"]["Tables"]["profiles"]["Row"]["id"];
	username: Database["public"]["Tables"]["profiles"]["Row"]["username"];
};

export type LinkState = {
	values: TLink[] | [];
	new: TLinkNew;
	loading: boolean;
	ownershipFilter: TABS;
	textFilter: string;
	setTextFilter: (filter: string) => void;
	setOwnershipFilter: (filter: TABS) => void;
	setLoading: (load: boolean) => void;
	set: (links: TLink[]) => void;
	update: (link: TLinkUpdate) => void;
	create: (link: Partial<TLinkNew>) => void;
};

const useUserGlobalState = create<UserState>()((set) => ({
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
	is_public: false,
	setis_public: (is_public) => set(() => ({ is_public })),
	setId: (id) => set(() => ({ id })),
	setUserName: (userName) => set(() => ({ userName })),
	setEmail: (email) => set(() => ({ email })),
	setAvatar: ({ img, file, fileName }) =>
		set(() => ({
			avatar: {
				img: img || "",
				file: file || null,
				fileName: fileName || ""
			}
		})),
	setModified: (isModified) =>
		set((state) => ({
			...state,
			modified: isModified
		}))
}));

const useLinkGlobalState = create<LinkState>()((set) => ({
	loading: false,
	values: [],
	new: {
		by: "",
		title: "",
		share_with: []
	},
	ownershipFilter: TABS.ALL,
	textFilter: "",
	setTextFilter: (filter) => set({ textFilter: filter }),
	setOwnershipFilter: (filter) => set({ ownershipFilter: filter }),
	setLoading: (isLoading) => set({ loading: isLoading }),
	set: (links) => set(() => ({ values: links })),
	create: (link) =>
		set((state) => ({
			new: {
				...state.new,
				...link
			}
		})),
	update: (link) =>
		set((state) => {
			const currentLinks = structuredClone(state.values);
			const updateLinkIdx = currentLinks.findIndex(
				(el) => el.id === link.id
			);
			currentLinks[updateLinkIdx] = {
				...currentLinks[updateLinkIdx],
				...link
			};

			return { ...state, values: currentLinks };
		})
}));

if (process.env.NODE_ENV === "development") {
	mountStoreDevtool("users", useUserGlobalState);
	mountStoreDevtool("links", useLinkGlobalState);
}

export { useUserGlobalState, useLinkGlobalState, NAVBAR_OPTIONS };
