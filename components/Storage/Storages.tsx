import { View, FlatList, Text, RefreshControl, Image } from 'react-native';
import StorageCard from '../Home/sub components/StorageCard';
import LoadingStorageCard from '../Home/sub components/LoadingStorageCard';
import { useHubsByRegion } from '@/store/Public/Public Storage Feed Endpoints/hubsByRegion';


export default function Storages() {
    const { loading, allstorages, selectedRegion, load_hubs, error, justSearch, searchQuery, search_for_hubs } = useHubsByRegion();

    if (loading) return (
        <View className='mx-3 mt-5'>
            <View className='px-4 py-2'>
                {!justSearch ?
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'><Text className='text-gray-400'>Loading {
                        selectedRegion?.split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                    } Region </Text>
                    </Text>
                    :
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'><Text className='text-gray-400'>Loading Search Results</Text></Text>
                }
            </View>

            <View className='gap-3'>
                <LoadingStorageCard />
                <LoadingStorageCard />
                <LoadingStorageCard />
                <LoadingStorageCard />
            </View>
        </View>
    );

    if (!allstorages) return null;

    const { data, total } = allstorages;

    return (
        <>
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

                contentContainerClassName='gap-3 mx-3 mt-5 pb-5'

                keyExtractor={(item) => item.toString()}

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

                contentContainerStyle={{
                    paddingBottom: 125
                }}

                ListEmptyComponent={() => (
                    <View className='flex-1 items-center justify-center pt-10'>
                        <Image
                            source={require('@/assets/images/cold/no-result.png')}
                            resizeMode='contain'
                            className='w-40 h-40'
                            alt='No Storages Found in this region'
                        />
                        <Text className='font-MontserratSemiBold font-semibold text-primary'>No Storages Found in this region</Text>
                    </View>
                )}

                ListFooterComponent={() => (
                    data.length > 0 && <Text className='font-MontserratSemiBold text-center py-3 font-semibold text-black/65'>You've reached the end</Text>
                )}
            />
        </>
    )
}