import { fetchAPI } from "@/lib/fetch";
import { HubsNearMeData, HubsNearMeErrorResponse, HubsNearMeResponse } from "@/types/types";
import { create } from "zustand";

interface NearByHubsStore extends HubsNearMeData {
    loading: boolean;
    error: string;
    load_hubs_near_me: (location: {
        lng: number;
        lat: number;
        limit: string;
        radius?: number;
    }) => Promise<void>;
}

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

export const useHubsNearMe = create<NearByHubsStore>((set) => ({
    storages: [],
    radius: 0,
    unit: "",
    total: 0,
    loading: false,
    error: "",
    load_hubs_near_me: async ({ lat, lng, radius, limit = 3 }) => {
        try {
            set({ loading: true, error: "" });

            const urlParams = new URLSearchParams();
            urlParams.append("latitude", lat.toString());
            urlParams.append("longitude", lng.toString());
            radius && urlParams.append("radius", radius.toString());
            urlParams.append("limit", limit.toString());

            const response: HubsNearMeResponse | HubsNearMeErrorResponse = await fetchAPI(`http://46.101.23.53/api/nearby-storages?${urlParams.toString()}`);

            const { message, status } = response;

            if (!status) {
                set({ error: (response.error.latitude || []).concat(response.error.longitude || []).join(", ") || message });
                return;
            }

            set({
                error: "",
                storages: response.data.storages,
                radius: response.data.radius,
                unit: response.data.unit,
                total: response.data.total
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            console.log(error)
            set({ error: "An error occurred during load hubs near me!" });
        } finally {
            set({ loading: false });
        }
    }
}))