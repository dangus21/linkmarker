import type { Database } from "@/lib/types";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

const NAVBAR_OPTIONS = {
	LINKS: "links",
	NEW_LINK: "new_link",
	PROFILE: "profile",
} as const;

type TAvatar = {
	img?: string;
	file: File | null;
	fileName?: string;
};

export type TLink = Database["public"]["Tables"]["links"]["Row"];
export type TLinkNew = Database["public"]["Tables"]["links"]["Insert"];
export type TLinkUpdate = Database["public"]["Tables"]["links"]["Update"];

export enum TABS {
	ALL = 0,
	MINE = 1,
	SHARED = 2,
	PRIVATE = 3,
	ARCHIVED = 4,
}

export type User = {
	id: Database["public"]["Tables"]["profiles"]["Row"]["id"];
	username: Database["public"]["Tables"]["profiles"]["Row"]["username"];
};

export type WindowSize = {
	width: number;
	height: number;
	setSizes: (key: "width" | "height", value: number) => void;
};

export type UserState = {
	id: string;
	userName: string;
	email: string;
	password: string;
	avatar: TAvatar;
	hasAvatar: null | boolean;
	modified: boolean;
	is_public: boolean;
	setis_public: (is_public: boolean) => void;
	setModified: (isModified: boolean) => void;
	setId: (id: string) => void;
	setUserName: (id: string) => void;
	setEmail: (id: string) => void;
	setHasAvatar: (flag: boolean) => void;
	setAvatar: ({ img, file, fileName }: Partial<TAvatar>) => void;
};

const useUserGlobalState = create<UserState>()((set) => ({
	id: "",
	userName: "",
	email: "",
	password: "",
	avatar: {
		img: "",
		file: null,
		fileName: "",
	},
	hasAvatar: null,
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
				fileName: fileName || "",
			},
		})),
	setModified: (isModified) =>
		set(() => ({
			modified: isModified,
		})),
	setHasAvatar: (flag) =>
		set(() => ({
			hasAvatar: flag,
		})),
}));

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
	resetNewLink: () => void;
};

const useLinkGlobalState = create<LinkState>()((set) => ({
	loading: false,
	values: [],
	new: {
		by: "",
		title: "",
		share_with: [],
	},
	ownershipFilter: TABS.ALL,
	textFilter: "",
	setTextFilter: (filter) => set({ textFilter: filter }),
	setOwnershipFilter: (filter) => set({ ownershipFilter: filter }),
	setLoading: (isLoading) => set({ loading: isLoading }),
	set: (links) => set(() => ({ values: links })),
	resetNewLink: () =>
		set(() => ({
			new: {
				by: "",
				title: "",
				url: "",
				origin: "",
				share_with: [],
			},
		})),
	create: (link) =>
		set((state) => ({
			new: {
				...state.new,
				...link,
			},
		})),
	update: (link) =>
		set((state) => {
			const updateLinkIdx = state.values.findIndex(
				(el) => el.id === link.id,
			);

			state.values[updateLinkIdx] = {
				...state.values[updateLinkIdx],
				...link,
			};

			return { values: state.values };
		}),
}));

type EditLinkState = {
	linksBeingEdited: Partial<TLink>[];
	setLinkForEdit: (linkId?: string) => void;
};
const useLinkMultiEditState = create<EditLinkState>((set) => ({
	linksBeingEdited: [],
	setLinkForEdit: (linkId) =>
		set((state) => {
			if (!linkId) {
				return { linksBeingEdited: [] };
			}
			// Check if the link is already in the linksBeingEdited array
			if (!state.linksBeingEdited.some((link) => link?.id === linkId)) {
				return {
					linksBeingEdited: [
						...state.linksBeingEdited,
						{ id: linkId },
					],
				};
			}
			return {
				linksBeingEdited: state.linksBeingEdited.filter(
					(link) => link.id !== linkId,
				),
			};
		}),
	setLinkEditData: () => null,
}));

if (process.env.NODE_ENV === "development") {
	mountStoreDevtool("users", useUserGlobalState);
	mountStoreDevtool("links", useLinkGlobalState);
	mountStoreDevtool("edit", useLinkMultiEditState);
}

export {
	useUserGlobalState,
	useLinkGlobalState,
	NAVBAR_OPTIONS,
	useLinkMultiEditState,
};
