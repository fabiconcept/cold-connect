import { View, FlatList, Text, RefreshControl, Image } from 'react-native';
import StorageCard from '../Home/sub components/StorageCard';
import LoadingStorageCard from '../Home/sub components/LoadingStorageCard';
import { useHubsByRegion } from '@/store/Public/Public Storage Feed Endpoints/hubsByRegion';
import { useRef, useState } from 'react';
import { URL } from '@/types/types';

export default function Storages() {
    const { loading, allstorages, selectedRegion, load_hubs, error, justSearch, searchQuery, load_more, search_for_hubs } = useHubsByRegion();
    const [loadingMore, setLoadingMore] = useState(false);
    const onEndReachedCalledRef = useRef(false);

    if (loading) return (
        <View className='mx-3 mt-5'>
            <View className='px-4 py-2'>
                {!justSearch ?
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'>
                        <Text className='text-gray-400'>Loading {
                            selectedRegion?.split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")
                        } Region </Text>
                    </Text>
                    :
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'>
                        <Text className='text-gray-400'>Loading Search Results</Text>
                    </Text>
                }
            </View>

            <View className='gap-3'>
                <LoadingStorageCard />
                <LoadingStorageCard />
                <LoadingStorageCard />
            </View>
        </View>
    );

    if (error) return (
        <View className='mx-3 mt-5 mb-5'>
            <Text className='font-MontserratSemiBold text-center font-semibold text-red-500'>{error}</Text>
        </View>
    );

    if (!allstorages) return (
        <View className='mx-3 mt-5 mb-5'>
            <Text className='font-MontserratSemiBold text-center font-semibold text-red-500'>An unexpected error occurred!</Text>
        </View>
    )

    const { data, total, next_page_url } = allstorages;

    const loadMoreStorages = async () => {
        if (total <= data.length) return;
        if (loadingMore) return;
        setLoadingMore(true);

        load_more(next_page_url as URL);

        setTimeout(() => {
            setLoadingMore(false);
        }, 1000);
    };

    const handleLoadMore = () => {
        if (!onEndReachedCalledRef.current) {
            onEndReachedCalledRef.current = true;
            loadMoreStorages();
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <StorageCard
                    hub_name={item.name}
                    imageSource={item.photo}
                    address={item.location}
                    rating={item.star}
                    status={item.availability as "active" | "inactive"}
                    distance={item.distance}
                    hub_id={item.id}
                />
            )}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        if (justSearch) {
                            search_for_hubs(searchQuery);
                        } else {
                            load_hubs(selectedRegion!);
                        }
                    }}
                />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            onMomentumScrollEnd={() => {
                onEndReachedCalledRef.current = false;
            }}
            contentContainerClassName='gap-3 mx-3 mt-5 pb-5'
            keyExtractor={(item) => `${item.toString()}-${Math.random().toString(36).substring(7)}`}
            ListHeaderComponent={() => (
                <View className='px-4 py-2'>
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'>
                        {!justSearch ?
                            <>
                                <Text className='text-gray-400'>{
                                    selectedRegion?.split("-")
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")
                                } Region:</Text> ({total})
                            </>
                            :
                            <>
                                <Text className='text-gray-400'>Search Results:</Text> ({total})
                            </>
                        }
                    </Text>
                </View>
            )}
            ListEmptyComponent={() => (
                <View className='flex-1 items-center justify-center pt-10'>
                    <Image
                        source={require('@/assets/images/cold/no-result.png')}
                        resizeMode='contain'
                        className='w-40 h-40'
                        alt={justSearch ? "No Search Results Found" : "No Storages Found in this region"}
                    />
                    <Text className='font-MontserratSemiBold font-semibold text-primary'>{
                        justSearch ?
                            "No Search Results Found"
                            :
                            "No Storages Found in this region"
                    }</Text>
                </View>
            )}
            ListFooterComponent={() => (
                <>
                    {loadingMore && (
                        <View className='py-4'>
                            <LoadingStorageCard />
                        </View>
                    )}
                    {data.length > 0 && !loadingMore && (
                        <Text className='font-MontserratSemiBold text-center py-3 font-semibold text-black/65'>
                            You've reached the end
                        </Text>
                    )}
                </>
            )}
            contentContainerStyle={{
                paddingBottom: 125
            }}
        />
    );
}