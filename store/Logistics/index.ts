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
    fromLocation: "",
    setFromLocation: (location: string) => set({ fromLocation: location }),
    toLocation: "",
    setToLocation: (location: string) => set({ toLocation: location }),
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