import { View, Text, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AnimatedPressable from '@/components/general sub components/AnimatedPress';
import clsx from 'clsx';
import { useHubDistance } from '@/lib/Hooks/useHubDistance';
import { useEffect } from 'react';
const { width } = Dimensions.get("window");

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

export default function StorageCard({
    hub_name: title,
    imageSource,
    address,
    rating = 0,
    status,
    distance,
    hub_id,
    coordinates
}: {
    hub_name: string,
    imageSource: string,
    address: string,
    rating: number,
    status: "active" | "inactive",
    distance: number,
    hub_id: number,
    coordinates?: {
        latitude: number,
        longitude: number
    }
}) {
    if (!baseUrl) return null;
    const [hubDistance, hubDistanceLoading, setHubCoordinates] = useHubDistance();

    useEffect(() => {
        if (!coordinates || !coordinates.latitude || !coordinates.longitude) return;
        setHubCoordinates(coordinates);
    }, [coordinates]);

    const router = useRouter();

    return (
        <AnimatedPressable
            onPress={() => router.push(`/(root)/cold-storage/${hub_id}`)}
            hitSlop={-10}
        >
            <View className='bg-white border border-gray-200 shadow-lg shadow-black/30 rounded-3xl h-[200px] overflow-hidden relative mr-3 last:mr-1' style={{ width: width - 24 }}>
                <Image
                    source={{ uri: `http://46.101.23.53/${imageSource}` }}
                    className='w-full h-full'
                />
                <View className='absolute gap-5 bottom-0 left-0 right-0 p-4 bg-white flex-row items-center justify-between border-t border-t-gray-200' style={{ width: width - 18 }}>
                    <View className='flex-1'>
                        <Text className='text-lg font-semibold leading-5'>
                            {`${title} `}
                            {new Array(rating).fill(0).map((_, i) => (
                                <FontAwesome
                                    key={i}
                                    name="star"
                                    size={14}
                                    color={"#FFC107"}
                                />
                            ))}
                            {new Array(5 - rating).fill(0).map((_, i) => (
                                <FontAwesome
                                    key={i}
                                    name="star-o"
                                    size={14}
                                    color={"#FFC107"}
                                />
                            ))}
                        </Text>
                        <Text className='text-sm mb-2 opacity-50'>{address}</Text>
                    </View>
                    <Text className={clsx(
                        'text-base font-semibold -mt-2 mr-2 capitalize',
                        status === "active" ? "text-[#04B90B]" : "text-red-500"
                    )}>
                        {status}
                    </Text>
                </View>
                <View className='absolute top-5 left-3 px-4 py-1 bg-primary rounded-3xl'>
                    <Text className='text-white text-base font-semibold'>
                        {!hubDistanceLoading && hubDistance ? hubDistance : distance} KM
                    </Text>
                </View>
            </View>
        </AnimatedPressable>
    )
}