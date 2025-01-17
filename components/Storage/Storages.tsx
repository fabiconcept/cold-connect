import { View, FlatList, Text } from 'react-native';
import StorageCard from '../Home/sub components/StorageCard';


export default function Storages() {
    return (
        <FlatList
            data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={({ item }) => (
                <StorageCard />
            )}
            contentContainerClassName='gap-3 mx-3 mt-5 pb-5'
            keyExtractor={(item) => item.toString()}
            ListHeaderComponent={() => (
                <View className='px-4 py-2'>
                    <Text className='text-lg font-MontserratSemiBold font-semibold text-primary'><Text className='text-gray-400'>South East Region </Text>(12)</Text>
                </View>
            )}
            contentContainerStyle={{
                paddingBottom: 125
            }}
        />
    )
}