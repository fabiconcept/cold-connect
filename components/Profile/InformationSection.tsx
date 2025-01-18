import { InformationItem } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { View, Text } from 'react-native';

export default function InformationSection({
    data,
    title
}: {
    data: InformationItem[],
    title: string
}) {
    return (
        <View className='mt-5'>
            <Text className='text-lg font-semibold font-MontserratSemiBold'>{title}</Text>
            <View className='bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 mt-2'>
                {data.map((item, index) => (
                    <View key={index} className={clsx(
                        'flex-row justify-between items-center p-5',
                        index !== data.length - 1 && 'border-b border-gray-300'
                    )}>
                        <Text className='opacity-50'>{item.title}</Text>
                        <View className='flex-row gap-2 items-center justify-end flex-1'>
                            <View className='flex-1 items-end'>
                                <Text numberOfLines={1} className='text-right'>{item.value}</Text>
                            </View>
                            {item.editable ? (
                                <Feather name="edit-3" size={20} color="#0066e1" />
                            ) : null}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}