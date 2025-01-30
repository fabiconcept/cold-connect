import { LocationState } from "@/types/types";
import { create } from "zustand";
export const useLocationStore = create<LocationState>((set) => ({
    address: null,
    latitude: null,
    longitude: null,
    hasLocationPermission: false,
    setAddress: (address) => set({ address }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
    setHasLocationPermission: (hasLocationPermission) => set({ hasLocationPermission }),
}));