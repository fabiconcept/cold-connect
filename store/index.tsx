import { LocationState, StorageState } from "@/types/types";
import { create } from "zustand";

const storageAroundNigeria = [
    {
        id: 1,
        name: "Abuja Storage",
        location: {
            longitude: 8.9932,
            latitude: 9.0788,
        },
        capacity: 10000,
        price: 1000,
        image: "https://via.placeholder.com/250",
    },
    {
        id: 2,
        name: "Lagos Storage",
        location: {
            longitude: 3.3958,
            latitude: 6.4551,
        },
        capacity: 5000,
        price: 500,
        image: "https://via.placeholder.com/250",
    },
    {
        id: 3,
        name: "Port Harcourt Storage",
        location: {
            longitude: 7.0023,
            latitude: 4.7942,
        },
        capacity: 2000,
        price: 200,
        image: "https://via.placeholder.com/250",
    },
    {
        id: 4,
        name: "Kano Storage",
        location: {
            longitude: 8.5244,
            latitude: 12.0447,
        },
        capacity: 1500,
        price: 150,
        image: "https://via.placeholder.com/250",
    },
    {
        id: 5,
        name: "Ibadan Storage",
        location: {
            longitude: 3.8667,
            latitude: 7.3667,
        },
        capacity: 1000,
        price: 100,
        image: "https://via.placeholder.com/250",
    },
    {
        id: 6,
        name: "Benin Storage",
        location: {
            longitude: 5.6249,
            latitude: 6.3318,
        },
        capacity: 500,
        price: 50,
        image: "https://via.placeholder.com/250",
    },
];


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

export const useStorageStore = create<StorageState>((set) => ({
    storages: storageAroundNigeria,
    setStorages: (storages) => set({ storages }),
}));