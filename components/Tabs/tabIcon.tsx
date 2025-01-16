import clsx from 'clsx';
import { View, Text } from 'react-native';

export default function TabIcon({ focused, Icon, title, className }: {
    focused: boolean,
    Icon: React.JSX.Element,
    title: string,
    className?: string
}) {
    return (
        <View className={clsx(
            "text-center p-2 rounded-xl h-[66px] items-center justify-center w-[68px] -mt-[28]",
            className,
            focused && "bg-black/30"
        )}>
            {Icon}
            <Text className='text-xs text-white text-center'>{title}</Text>
        </View>
    )
}