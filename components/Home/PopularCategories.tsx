import { Link, router } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import CategoryCard from './sub components/categoryCard';
import { PopularCategories } from '@/constants/popularCategories';

export default function PopularCategoriesComponent() {
    return (
        <View className='mx-3'>
            <View className='flex-row items-center justify-between mx-2 mt-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Popular Categories</Text>
                <Link href={"/(root)/(tabs)/crates"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>
            <FlatList
                data={PopularCategories}
                renderItem={({ item }) => (
                    <CategoryCard
                        title={item.title}
                        imageSource={item.imageSource}
                        backgroundImage={item.backgroundImage}
                        onPress={() => router.push(`/(root)/product-category/${item.title}`)}
                    />
                )}
                keyExtractor={(item) => item.title}
                horizontal
                contentContainerStyle={{ gap: 8 }}
                contentContainerClassName='mt-5'
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}