import { InformationItem, InformationActionItem } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { View, Text, TouchableOpacity } from 'react-native';
import AnimatedPressable from '../general sub components/AnimatedPress';

export default function InformationSection({
    data,
    title
}: {
    data: (InformationItem | InformationActionItem)[],
    title: string
}) {
    return (
        <View className='mt-5'>
            <Text className='text-lg font-semibold font-MontserratSemiBold'>{title}</Text>
            <View className='bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 mt-2'>
                {data.map((item, index) => {
                    if (item.type === "text") {
                        return (
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
                        )
                    } else if (item.type === "action") {
                        return (
                            <TouchableOpacity hitSlop={10} onPress={item.action}>
                                <View key={index} className={clsx(
                                    'flex-row justify-between items-center p-5',
                                    index !== data.length - 1 && 'border-b border-gray-300'
                                )}>
                                    <View className='flex-1 flex-row gap-2 items-center'>
                                        <Feather name={item.Icon} size={18} color={item.themeColor} />
                                        <Text className='font-Montserrat font-semibold' style={{ color: item.themeColor }}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                })}
            </View>
        </View>
    )
}