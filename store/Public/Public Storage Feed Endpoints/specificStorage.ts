import { fetchAPI } from "@/lib/fetch";
import { SpecificStorage } from "@/types/types";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

interface SpecificStorageStore extends SpecificStorage {
    loading: boolean,
    error: string,
    load_hub: (id: number) => Promise<void>,
}

export const useSpecificStorage = create<SpecificStorageStore>((set) => ({
    loading: false,
    error: "",
    id: 0,
    location: "",
    name: "",
    photo: "",
    capacity: 0,
    availability: "",
    distance: 0,
    published_at: "",
    is_commentable: 0,
    star: 0,
    rates: 0,
    created_at: "",
    updated_at: "",
    booking_id: null,
    tags_relation: [],
    load_hub: async (hub_id: number) => {
        try {
            if (!hub_id) throw new Error("Hub ID is required");

            set({ loading: true });
            const response: SpecificStorage = await fetchAPI(`${baseUrl}/coldstoragerooms/${hub_id}`);

            const payload = {
                ...response,
                error: ""
            };
            set({ ...payload });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load specific!"
            });
        } finally {
            set({ loading: false });
        }
    }
}))