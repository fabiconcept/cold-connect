import { View, FlatList } from 'react-native';
import ItemCard from './ItemCard';
import { router } from 'expo-router';
import { ProductGrid } from '@/constants/ProductGrid';

export default function Grid() {

    return (
        <View className='mt-5'>
            <FlatList
                data={ProductGrid}
                renderItem={({ item }) => (
                    <ItemCard
                        title={item.title}
                        imageSource={item.imageSource}
                        backgroundImage={item.backgroundImage}
                        onPress={() => router.push(`/(root)/product-category/${item.title}`)}
                    />
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{

                    justifyContent: 'center',
                    gap: 4
                }}
                contentContainerStyle={{
                    gap: 8,
                    paddingBottom: 20
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}