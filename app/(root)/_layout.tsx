import GoToCartButton from "@/components/general sub components/GoToCartButton";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="enable-location" options={{ headerShown: false }} />
            <Stack.Screen name="my-invoices" options={{ headerShown: false }} />
            <Stack.Screen name="cold-storage/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="product-category/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="product-category" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <GoToCartButton />
        </Stack>
    )
}