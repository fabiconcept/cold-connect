import { useProducts } from '@/store/Products';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Header() {
    const { clearProductsFromCart } = useProducts();

    const clearCart = () => {
        clearProductsFromCart();
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
                onPress={clearCart}
            >
                <Feather
                    name="trash-2"
                    size={24}
                    color="#ff00005a"
                />
            </TouchableOpacity>
        </View>
    )
}