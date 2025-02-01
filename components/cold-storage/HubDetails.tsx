import { View, Text } from 'react-native';
import InfoPill from '../general sub components/InfoPill';
import { FontAwesome } from '@expo/vector-icons';
import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';
import LoadingShimmer from '../general sub components/LoadingShimmer';

export default function HubDetails() {
    const { loading, name, availability, star, location } = useSpecificStorage();

    if (loading) return (
        <View className='py-7 px-2 gap-1 border-b border-gray-200'>
            <View className='flex-row items-center justify-between'>
                <LoadingShimmer
                    compHeight={14}
                    compWidth={"50%"}
                    borderRadius={10}
                    style={{}}
                    shimmerWidth={362}
                    shimmerDuration={1000}
                />
                <LoadingShimmer
                    compHeight={14}
                    compWidth={"20%"}
                    borderRadius={10}
                    style={{
                        backgroundColor: "#22c55e"
                    }}
                    shimmerWidth={362}
                    shimmerDuration={1000}
                />
            </View>
            <LoadingShimmer
                compHeight={14}
                compWidth={"30%"}
                borderRadius={10}
                style={{}}
                shimmerWidth={362}
                shimmerDuration={1000}
            />
            <LoadingShimmer
                compHeight={10}
                compWidth={"70%"}
                borderRadius={10}
                style={{}}
                shimmerWidth={362}
                shimmerDuration={1000}
            />
        </View>
    );

    return (
        <View className='py-7 px-2 gap-1 border-b border-gray-200'>
            <View className='flex-row items-start justify-between'>
                <Text className='text-2xl font-bold font-MontserratBold flex-1' numberOfLines={2}>{name}</Text>
                {availability === "active" && <InfoPill className='bg-green-500' title='Active' />}
                {availability === "inactive" && <InfoPill className='bg-red-500' title='Inactive' />}
            </View>
            <View className='flex-row gap-1'>
                {new Array(star).fill(0).map((_, i) => (
                    <FontAwesome
                        key={i}
                        name="star"
                        size={20}
                        color={"#FFC107"}
                    />
                ))}
                {new Array(5 - star).fill(0).map((_, i) => (
                    <FontAwesome
                        key={i}
                        name="star-o"
                        size={20}
                        color={"#FFC107"}
                    />
                ))}
            </View>
            <Text>{location}</Text>
        </View>
    )
}