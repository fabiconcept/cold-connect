import Header from '@/components/Map/Header';
import LogisticsView from '@/components/Map/LogisticsView';
import StorageView from '@/components/Map/StorageView';
import { useLocationStore } from '@/store';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';



export default function Map() {
    const { hasLocationPermission } = useLocationStore();
    const { type }: { type: "storage" | "logistics" } = useLocalSearchParams();

    if (!hasLocationPermission) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-center text-2xl font-MontserratSemiBold text-red-500'>Storage Not Found</Text>
        </View>
    );

    return (
        <View className='flex-1 h-full w-full justify-center items-center'>
            {type === "storage" &&
                <StorageView
                    provider={PROVIDER_GOOGLE}
                />
            }
            {type === "logistics" &&
                <LogisticsView
                    provider={PROVIDER_GOOGLE}
                />
            }

            <Header />
        </View>
    )
}