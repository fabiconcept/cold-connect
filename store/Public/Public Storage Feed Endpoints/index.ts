import { fetchAPI } from "@/lib/fetch";
import { StorageFeed, StorageFeedPagination } from "@/types/types";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

export const useAllStorageFeed = create<StorageFeed>((set) => ({
    current_page: 0,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: [],
    per_page: 0,
    to: 0,
    total: 0,
    next_page_url: "",
    path: "",
    prev_page_url: "",
    more_pages: false,
    number: 0,
    error: "",
    loading: false,
    load_all: async () => {
        try {
            set({ loading: true });
            const response: {
                allstorage: StorageFeedPagination,
                morepages: boolean,
                number: number
            } = await fetchAPI(`${baseUrl}/all-storage`);

            const { allstorage, morepages, number } = response;
            const payload = {
                ...allstorage,
                more_pages: morepages,
                number: number,
                error: ""
            }
            set({ ...payload });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load all!"
            });
        } finally {
            set({ loading: false });
        }
    },
    load_more: async (amount) => {
        try {
            set({ loading: true });
            const response: {
                allstorage: StorageFeedPagination,
                morepages: boolean,
                number: number
            } = await fetchAPI(`${baseUrl}/loadmore/${amount}`);

            const { allstorage, morepages, number } = response;
            const payload = {
                ...allstorage,
                more_pages: morepages,
                number: number,
                error: ""
            }
            set({ ...payload });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load more!"
            });
        } finally {
            set({ loading: false });
        }
    }
}));