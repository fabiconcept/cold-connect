import { ColorState } from "@/types/types";
import { create } from "zustand";

export const useCrates = create<ColorState>((set, get) => ({
    rate: 0,
    setRate: (rate) => set({ rate }),
    selectedColor: '',
    setSelectedColor: (color) => set({ selectedColor: color }),
    quantity: 1,
    setQuantity: (quantity) => set({ quantity }),
    pickUpLocation: '',
    setPickUpLocation: (location) => set({ pickUpLocation: location }),
    pickUpDate: '',
    setPickUpDate: (date) => set({ pickUpDate: date }),
    addedToCart: false,
    toggleAddedToCart: () => {
        set({ addedToCart: !get().addedToCart });
    },
}));