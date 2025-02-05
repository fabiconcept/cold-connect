import { Text, View } from 'react-native';
import FullButton from '../FullButton';
import clsx from 'clsx';

export default function ActionSheet({ action, value, inCart, canProceed = true, actionText = {
    yes: "Add to Cart",
    no: "Remove"
} }: {
    action: () => void,
    value: number,
    inCart: boolean,
    canProceed?: boolean,
    actionText?: {
        yes: string,
        no: string
    }
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
            {canProceed && <FullButton
                title={inCart ? actionText.no : actionText.yes}
                containerClassName='flex-1'
                className={clsx(
                    'flex-1 rounded-full py-4',
                    !inCart && 'bg-primary',
                    inCart && 'bg-red-500/20 border border-red-500'
                )}
                textClassName={clsx(
                    'text-lg font-semibold',
                    !inCart && 'text-white',
                    inCart && 'text-red-500/70'
                )}
                canProceed={canProceed}
                onPress={action}
            />}
        </View>
    )
}