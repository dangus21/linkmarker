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

export type UserState = {
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

export type LinkState = {
	values: TLink[] | [];
	new: TLinkUpdate;
	set: (links: TLink[]) => void;
	update: (link: TLinkUpdate) => void;
	create: (link: TLinkUpdate) => void;
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
	setId: (id) => set(() => ({ id })),
	setUserName: (userName) => set(() => ({ userName })),
	setEmail: (email) => set(() => ({ email })),
	setAvatar: ({ img, file, fileName }) => set(() => ({
		avatar: {
			img: img || "",
			file: file || null,
			fileName: fileName || ""
		}
	})),
	setModified: (isModified) => set(state => ({
		...state,
		modified: isModified
	}))
}));

const useLinkGlobalState = create<LinkState>()((set) => ({
	values: [],
	new: {},
	set: (links) => set(() => ({ values: links })),
	create: (link) => set((state) => ({
		new: {
			...state.new,
			...link
		}
	})),
	update: (link) => set((state) => {
		const currentLinks = structuredClone(state.values);
		const updateLinkIdx = currentLinks.findIndex(el => el.id === link.id);
		currentLinks[updateLinkIdx] = { ...currentLinks[updateLinkIdx], ...link };

		return ({ ...state, values: currentLinks });
	})
}));

export { useUserGlobalState, useLinkGlobalState, NAVBAR_OPTIONS };
