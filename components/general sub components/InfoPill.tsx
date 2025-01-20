import clsx from 'clsx';
import { View, Text } from 'react-native';

export default function InfoPill({ title, className = "bg-primary" }: { title: string, className?: string }) {
    return (
        <View className={clsx(
            'rounded-2xl px-4 py-1',
            className
        )}>
            <Text className='text-white text-sm font-MontserratSemiBold'>{title}</Text>
        </View>
    )
}