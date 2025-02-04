import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import AnimatedPressable from './AnimatedPress';
import { router, useSegments } from 'expo-router';
import { useProducts } from '@/store/Products';
import { useMemo } from 'react';

export default function GoToCartButton() {
    const segments = useSegments();
    const { products } = useProducts();

    const total = useMemo(() => {
        return products.filter(p => p.addedToCart).length;
    }, [products])


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