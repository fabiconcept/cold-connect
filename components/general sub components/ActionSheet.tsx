import { Text, View } from 'react-native';
import FullButton from '../FullButton';

export default function ActionSheet({ action, actionText, value }: {
    action: () => void,
    actionText: string,
    value: number
}) {
    return (
        <View className='absolute bottom-0 left-0 px-5 py-7 bg-white border-t shadow-2xl shadow-black border-gray-200 flex-row gap-2 w-full items-center'>
            <View
                className='bg-white border shadow-2xl shadow-primary/20 border-primary/20 flex-1 w-full rounded-full py-4 items-center justify-center'
            >
                <Text className='text-primary text-2xl font-semibold text-center px-2' numberOfLines={1}>
                    ₦{value.toLocaleString()}
                </Text>
            </View>
            <FullButton
                title={actionText}
                containerClassName='flex-1'
                className='bg-primary flex-1 rounded-full py-4'
                textClassName='text-white text-lg font-semibold'
                onPress={action}
            />
        </View>
    )
}