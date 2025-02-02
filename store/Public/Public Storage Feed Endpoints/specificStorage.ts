import { fetchAPI } from "@/lib/fetch";
import { Hub, HubsAroundMeResponse, SpecificStorage } from "@/types/types";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

interface SpecificStorageStore extends SpecificStorage {
    loading: boolean,
    error: string,
    suggestedHubs: Hub[],
    loadingSuggestedHubs: boolean,
    load_related_hubs: (region: string) => Promise<void>,
    load_hub: (id: number) => Promise<void>,
}

export const useSpecificStorage = create<SpecificStorageStore>((set, get) => ({
    loading: false,
    loadingSuggestedHubs: false,
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
    suggestedHubs: [],
    star: 0,
    rates: 0,
    created_at: "",
    updated_at: "",
    booking_id: null,
    tags_relation: [],
    load_related_hubs: async (region) => {
        try {
            set({ loadingSuggestedHubs: true });
            const { allstorages }: HubsAroundMeResponse = await fetchAPI(`${baseUrl}/loadmore-tag-storage/3/${region}`);

            const currentHub = get().id;
            const removedStorage = allstorages.data.filter((storage) => storage.id !== currentHub).splice(0, 2);
            
            set({ suggestedHubs: removedStorage });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
        } finally {
            set({ loadingSuggestedHubs: false });
        }
    },
    load_hub: async (hub_id: number) => {
        try {
            if (!hub_id) throw new Error("Hub ID is required");

            set({ loading: true, suggestedHubs: [] });
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