import { View, Text } from 'react-native';
import AnimatedPressable from '../general sub components/AnimatedPress';
import { InvoiceCardProps } from '@/types/types';
import clsx from 'clsx';

export default function InvoiceCard({ id, date, amount, status }: InvoiceCardProps) {
    return (
        <AnimatedPressable activeOpacity={0.2} className='bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 p-4 gap-1'>
            <View className='flex-row justify-between items-center'>
                <Text className='text-lg font-semibold'>{id}</Text>
                <Text className={clsx(
                    'text-md',
                    status === "Paid" && 'text-green-500',
                    status === "Pending" && 'text-yellow-500',
                    status === "Cancelled" && 'text-gray-500',
                    status === "Failed" && 'text-red-500'
                )}>{status}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className='opacity-50'>{date.toDateString()}</Text>
                <Text className='text-xl font-semibold'>₦{Number(amount).toLocaleString()}</Text>
            </View>
        </AnimatedPressable>
    )
}