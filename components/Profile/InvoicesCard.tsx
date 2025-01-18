import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

export default function InvoicesCard() {
    return (
        <TouchableOpacity
            className='bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 mt-5 p-5 flex-row justify-between items-center'
            hitSlop={10}
        >
            <Text>My Invoices</Text>
            <View className='flex-row items-center'>
                <Text>
                    11
                </Text>
                <Feather name="chevron-right" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
}