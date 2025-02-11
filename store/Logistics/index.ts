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
    fromLocation: string;
    setFromLocation: (location: string) => void;
    toLocation: string;
    setToLocation: (location: string) => void;
    addedToCart: boolean;
    toggleAddedToCart: () => void;
}

export const useLogisticsStore = create<LogisticsState>((set, get) => ({
    loading: false,
    error: null,
    quantity: 0,
    setQuantity: (quantity: number) => set({ quantity }),
    boxQuantity: 0,
    setBoxQuantity: (quantity: number) => set({ boxQuantity: quantity }),
    truckType: "medium",
    setTruckType: (type: "medium" | "large") => set({ truckType: type }),
    fromLocation: "",
    setFromLocation: (location: string) => set({ fromLocation: location }),
    toLocation: "",
    setToLocation: (location: string) => set({ toLocation: location }),
    addedToCart: false,
    toggleAddedToCart: () => {
        const { quantity, boxQuantity, truckType, fromLocation, toLocation } = get();
        if (!quantity || !boxQuantity || !truckType || !fromLocation || !toLocation) return;

        set({ addedToCart: !get().addedToCart });
    }
}));