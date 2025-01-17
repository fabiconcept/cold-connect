import { View, Text } from 'react-native';

export default function Header() {
    return (
        <View className='px-3 z-20 absolute left-0 top-5 w-full flex-row justify-between items-center'>
            <Text className='font-semibold text-xl text-center w-full font-MontserratSemiBold'>Buy Crates</Text>
        </View>
    )
}