import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';
import { View, Text, Image } from 'react-native';
import LoadingShimmer from '../general sub components/LoadingShimmer';

export default function StoragePhoto() {
    const { loading, error, photo } = useSpecificStorage();

    if (loading) return (
        <LoadingShimmer
            compHeight={430}
            compWidth={"100%"}
            borderRadius={0}
            style={{}}
            shimmerWidth={362}
            shimmerDuration={1000}
        />
    );

    if (error) return (
        <View className='h-[430px] justify-center items-center px-5  bg-gray-100'>
            <Text className='text-red-500 text-center'>
                Opps, something went wrong!
            </Text>
        </View>
    );

    return (
        <View className='items-center justify-center bg-gray-100 h-[430px] w-full'>
            <Image
                source={{
                    uri: `http://46.101.23.53/${photo}`
                }}
                resizeMode='cover'
                className='object-center w-full h-full'
            />
        </View>
    )
}