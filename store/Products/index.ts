import { create } from "zustand";

interface Product {
    title: "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables";
    rate: number;
    quantity: number;
    storageLength: number;
    addedToCart?: boolean
}

interface ProductsStore {
    products: Product[],
    addProduct: (product: Product) => void,
    removeProduct: (title: Product['title']) => void,
    clearProducts: () => void,
    updateProduct: (product: Product) => void,
    toggleAddedToCart: (title: Product['title']) => void
}

export const useProducts = create<ProductsStore>((set) => ({
    products: [],
    addProduct: (product: Product) => set((state) => ({
        products: [...state.products, product]
    })),
    removeProduct: (title: Product['title']) => set((state) => ({
        products: state.products.filter((product) => product.title !== title)
    })),
    clearProducts: () => set({ products: [] }),
    updateProduct: (product: Product) => set((state) => ({
        products: state.products.map((p) => p.title === product.title ? product : p)
    })),
    toggleAddedToCart: (title: Product['title']) => set((state) => ({
        products: state.products.map((p) => p.title === title ? { ...p, addedToCart: !p.addedToCart } : p)
    }))
}))