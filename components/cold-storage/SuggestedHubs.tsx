import { View, Text } from 'react-native';
import StorageCard from '../Home/sub components/StorageCard';
import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';
import LoadingStorageCard from '../Home/sub components/LoadingStorageCard';
import { useEffect } from 'react';

export default function SuggestedHubs() {
    const { tags_relation, load_related_hubs, loadingSuggestedHubs, suggestedHubs } = useSpecificStorage();

    useEffect(() => {
        if (tags_relation.length === 0) return;

        const slug = tags_relation[0].slug;

        (async () => {
            await load_related_hubs(slug);
        })();
    }, [tags_relation]);

    if (loadingSuggestedHubs) return (
        <View className='my-5 gap-2'>
            <View className='flex-row items-center justify-between mx-2 mb-3'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>Suggested Hubs </Text>
            </View>
            <LoadingStorageCard />
        </View>
    );

    if (suggestedHubs.length === 0) return null;

    return (
        <View className='my-5 gap-2'>
            <View className='flex-row items-center justify-between mx-2 mb-3'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>Suggested Hubs <Text className='text-base text-gray-400 font-MontserratSemiBold'>({suggestedHubs.length})</Text></Text>
            </View>

            {suggestedHubs.map((suggestedHub, index) => (
                <StorageCard
                    hub_name={suggestedHub.name}
                    imageSource={suggestedHub.photo}
                    address={suggestedHub.location}
                    rating={suggestedHub.star}
                    status={suggestedHub.availability as "active" | "inactive"}
                    distance={suggestedHub.distance}
                    hub_id={suggestedHub.id}
                    key={index}
                />
            ))}
        </View>
    )
}