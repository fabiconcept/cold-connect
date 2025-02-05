import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import AnimatedPressable from './AnimatedPress';
import { router, useSegments } from 'expo-router';
import { useProducts } from '@/store/Products';
import { useEffect, useId, useMemo } from 'react';
import { useCrates } from '@/store/Crates';
import { useAuthenticationStore } from '@/store/auth';
import { getToken, saveToken } from '@/lib/KeyChain';
import { CartPayload } from '@/types/types';

export default function GoToCartButton() {
    const segments = useSegments();
    const { products, selectedHub, setSelectedHub, addProduct } = useProducts();
    const { addedToCart: crateAddedToCart, quantity, rate, pickUpDate, pickUpLocation, selectedColor, setSelectedColor, setPickUpDate, setPickUpLocation, setRate, setQuantity, toggleAddedToCart } = useCrates();
    const { isSignedIn, activeUser } = useAuthenticationStore();

    useEffect(() => {
        if (!isSignedIn) return;

        (async () => {
            const userId = activeUser.username;
            const cartId = encodeURI(`${userId.toLowerCase()}-cart`);

            const token = await getToken(cartId);
            if (token) {
                const payload = JSON.parse(token) as CartPayload;
                const { crates, products } = payload;

                if (products) {
                    setSelectedHub(products.selectedHub);
                    products.data.forEach(p => addProduct(p));
                }

                if (crates) {
                    setQuantity(crates.quantity);
                    setRate(crates.rate);
                    setPickUpDate(crates.pickUpDate);
                    setPickUpLocation(crates.pickUpLocation);
                    setSelectedColor(crates.selectedColor);
                    toggleAddedToCart();
                }
            }
        })()
    }, [])

    useEffect(() => {
        if (!isSignedIn) return;

        (async () => {
            const userId = activeUser.username;
            const cartId = encodeURI(`${userId.toLowerCase()}-cart`);


            const cartProducts = products.filter(p => p.addedToCart);

            const payload: CartPayload = {
                products: cartProducts.length > 0 ? {
                    selectedHub: selectedHub,
                    data: cartProducts
                } : undefined,
                crates: crateAddedToCart ? {
                    addedToCart: crateAddedToCart, quantity, rate, pickUpDate, pickUpLocation, selectedColor
                } : undefined
            }

            if (payload.products === undefined && payload.crates === undefined) return;

            await saveToken(JSON.stringify(payload), cartId);
        })()
    }, [isSignedIn, products, crateAddedToCart, selectedHub, quantity, rate, pickUpDate, pickUpLocation, selectedColor]);

    const total = useMemo(() => {
        const crateCount = crateAddedToCart ? 1 : 0;
        return products.filter(p => p.addedToCart).length + crateCount;
    }, [products, crateAddedToCart])


    // Hide button on cart screen
    if (segments[segments.length - 1] === 'cart') return null;
    if (segments[segments.length - 1] === 'map') return null;
    if (segments[segments.length - 1] === 'my-invoices') return null;
    if (segments[segments.length - 1] === 'enable-location') return null;
    if (segments[segments.length - 1] === 'choose-payment-method') return null;

    return (
        <AnimatedPressable
            containerClassName='absolute bottom-32 right-5 z-[9999] h-[70px] w-[70px] rounded-full bg-[#0066e1] items-center justify-center shadow-xl shadow-black'
            onPress={() => router.push("/(root)/cart")}
        >
            <Feather
                name="shopping-cart"
                size={32}
                color="white"
                className='-ml-1'
            />
            <View className='absolute -top-7 -left-7 h-8 w-8 rounded-full bg-white items-center justify-center border border-[#0066e1]/20'>
                <Text>{total}</Text>
            </View>
        </AnimatedPressable>
    )
}