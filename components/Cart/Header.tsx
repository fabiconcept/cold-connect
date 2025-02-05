import { useProducts } from '@/store/Products';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { useCrates } from '@/store/Crates';
import CautionAlert from '../general sub components/CautionAlert';

export default function Header() {
    const { clearProductsFromCart, products } = useProducts();
    const { toggleAddedToCart, addedToCart: crateAddedToCart } = useCrates();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const total = useMemo(() => {
        const crateCount = crateAddedToCart ? 1 : 0;
        return products.filter(p => p.addedToCart).length + crateCount;
    }, [products, crateAddedToCart])


    const clearCart = () => {
        clearProductsFromCart();
        crateAddedToCart && toggleAddedToCart();
        setIsModalVisible(false);
        if (Platform.OS === 'ios') {
            router.back();
            return;
        }
        if (Platform.OS === 'android') {
            ToastAndroid.show("Cart items cleared", ToastAndroid.SHORT);
            router.back();
            return;
        }
    }

    return (
        <View className='px-3 pb-2 z-20 justify-between items-center flex-row'>
            <TouchableOpacity
                hitSlop={20}
                className='w-[50px] h-[50px] justify-center items-center rounded-full bg-white shadow-lg'
                onPress={() => router.back()}
            >
                <Feather
                    name="chevron-left"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
            <Text className='flex-1 text-center font-semibold text-xl w-full font-MontserratSemiBold'>Cold Cart</Text>
            <TouchableOpacity
                hitSlop={20}
                className='w-[50px] h-[50px] justify-center items-center rounded-full bg-white shadow-lg'
                onPress={() => setIsModalVisible(true)}
                disabled={total === 0}
            >
                <Feather
                    name="trash-2"
                    size={24}
                    color={total === 0 ? "#ff00005a" : "#ff0000"}
                />
            </TouchableOpacity>
            <CautionAlert
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                action={clearCart}
                title="Clear Cart"
                actionText="Clear Cart"
                message="Are you sure? This action cannot be undone, this will clear your cart items."
            />
        </View>
    )
}