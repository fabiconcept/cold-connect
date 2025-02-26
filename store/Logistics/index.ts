import { Location } from "@/types/types";
import { create } from "zustand";

interface LogisticsState {
    loading: boolean;
    error: string | null;
    quantity: number;
    setQuantity: (quantity: number) => void;
    boxQuantity: number;
    setBoxQuantity: (quantity: number) => void;
    truckType: "medium" | "large";
    setTruckType: (type: "medium" | "large") => void;
    fromLocation: Location;
    setFromLocation: (location: Location) => void;
    toLocation: Location;
    setToLocation: (location: Location) => void;
    addedToCart: boolean;
    toggleAddedToCart: () => void;
    logisticsFilled: () => boolean;
}

export const useLogisticsStore = create<LogisticsState>((set, get) => ({
    loading: false,
    error: null,
    quantity: 1,
    setQuantity: (quantity: number) => set({ quantity }),
    boxQuantity: 1,
    setBoxQuantity: (quantity: number) => set({ boxQuantity: quantity }),
    truckType: "medium",
    setTruckType: (type: "medium" | "large") => set({ truckType: type }),
    fromLocation: {
        address: "",
        latitude: 0,
        longitude: 0
    },
    setFromLocation: (location) => set({ fromLocation: location }),
    toLocation: {
        address: "",
        latitude: 0,
        longitude: 0
    },
    setToLocation: (location) => set({ toLocation: location }),
    addedToCart: false,
    logisticsFilled: () => {
        return !!(get().quantity > 0 && get().boxQuantity > 0 && get().truckType.length > 0);
    },
    toggleAddedToCart: () => {
        const { logisticsFilled } = get();
        if (!logisticsFilled()) return;

        set({ addedToCart: !get().addedToCart });
    }
}));