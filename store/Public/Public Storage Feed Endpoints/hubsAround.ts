import { fetchAPI } from "@/lib/fetch";
import { HubsAroundMeErrorResponse, HubsAroundMeResponse } from "@/types/types";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

interface hubAroundMeStore extends HubsAroundMeResponse {
    loading: boolean;
    error: string;
    load_hubs: (region: string) => Promise<void>;
}

interface hubAroundMeStoreError extends HubsAroundMeErrorResponse {
    loading: boolean;
    error: string;
    load_hubs: (region: string) => Promise<void>;
}

export const useHubsAroundMe = create<hubAroundMeStore | hubAroundMeStoreError>((set) => ({
    allstorages: null,
    error: "",
    loading: false,
    morepages: false,
    tags: null,
    load_hubs: async (region: string) => {
        try {
            set({
                loading: true
            });

            set({ loading: true });
            const response: HubsAroundMeResponse = await fetchAPI(`http://46.101.23.53/api/tags-storage/${region}`);

            const { allstorages, morepages, tags } = response;

            set({
                allstorages,
                morepages,
                tags,
                error: "",
            })


        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load hubs!"
            });
        } finally {
            set({
                loading: false
            });
        }
    }
}));