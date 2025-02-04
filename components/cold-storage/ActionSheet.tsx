import { View } from 'react-native';
import FullButton from '../FullButton';
import { router } from 'expo-router';
import clsx from 'clsx';
import { useProducts } from '@/store/Products';

export default function ActionSheet({
    selectedHub
}: {
    selectedHub: string
}) {
    const { setSelectedHub, selectedHub: currentHub } = useProducts();

    const isHubSelected = currentHub && selectedHub === currentHub;

    return (
        <View className='absolute bottom-0 left-0 px-5 py-7 bg-white border-t shadow-2xl shadow-black border-gray-200 w-full'>
            <FullButton
                title={isHubSelected ? 'In use, Select Products' : 'Use this Hub'}
                containerClassName='flex-1'
                className={clsx(
                    'w-full rounded-full py-4',
                    !isHubSelected && 'bg-primary',
                    isHubSelected && 'bg-primary/20 border border-primary'
                )}
                textClassName={clsx(
                    'text-lg font-semibold',
                    !isHubSelected && 'text-white',
                    isHubSelected && 'text-primary'
                )}
                onPress={() => {
                    setSelectedHub(selectedHub);
                    router.push("/(root)/product-category");
                }}
            />
        </View>
    )
}