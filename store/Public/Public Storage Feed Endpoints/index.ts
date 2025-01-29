import { StorageFeed } from "@/types/types";
import { create } from "zustand";

const useStorageFeed = create<StorageFeed>((set) => ({
    all_storages: {
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
        prev_page_url: ""
    },
    load_all_storages: async () => { }
}));