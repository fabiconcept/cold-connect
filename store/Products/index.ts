import { ProductsStore, storeProduct } from "@/types/types";
import { create } from "zustand";

export const useProducts = create<ProductsStore>((set, get) => ({
    selectedHub: "",
    products: [],
    addProduct: (product: storeProduct) => set((state) => ({
        products: [...state.products, product]
    })),
    removeProduct: (title: storeProduct['title']) => set((state) => ({
        products: state.products.filter((product) => product.title !== title)
    })),
    clearProducts: () => set({ products: [] }),
    updateProduct: (product: storeProduct) => set((state) => ({
        products: state.products.map((p) => p.title === product.title ? product : p)
    })),
    toggleAddedToCart: (title: storeProduct['title']) => set((state) => ({
        products: state.products.map((p) => p.title === title ? { ...p, addedToCart: !p.addedToCart } : p)
    })),
    setSelectedHub: (newHub) => {
        set({ selectedHub: newHub });
    },
    clearProductsFromCart: () => {
        const products = get().products.map((item) => ({
            ...item,
            addedToCart: false
        }));

        set({
            products
        });
    },
}))