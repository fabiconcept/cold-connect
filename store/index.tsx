import { fetchAPI } from "@/lib/fetch";
import { LocationState, LocationStateWithPermission, StorageResponse, StorageState, StorageWithLocation } from "@/types/types";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

export const useLocationStore = create<LocationState | LocationStateWithPermission>((set) => ({
    address: null,
    latitude: null,
    longitude: null,
    hasLocationPermission: false,
    setAddress: (address) => set({ address }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
    setHasLocationPermission: (hasLocationPermission) => set({
        hasLocationPermission: hasLocationPermission
    }),
}));

export const useStorageStore = create<StorageState>((set) => ({
    storages: [],
    loading: false,
    error: null,
    loadStorages: async () => {
        try {
            set({
                loading: true,
            });
            const responseAll: StorageResponse = await fetchAPI(`${baseUrl}/all-storage`);
            const { total } = responseAll.allstorages;

            const loadAllResponse: StorageResponse = await fetchAPI(`${baseUrl}/loadmore/${total}`);

            const { data } = loadAllResponse.allstorages;

            const payload: StorageWithLocation[] = data.map((item) => ({
                name: item.name,
                location: {
                    latitude: item.latitude,
                    longitude: item.longitude
                }
            }));

            set({
                storages: payload,
                error: null,
            });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load storages!",
            });
        } finally {
            set({
                loading: false,
            });
        }
    },
}));