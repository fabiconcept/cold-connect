import { Link, router } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import CategoryCard from '../Home/sub components/categoryCard';
import { SuggestedCategories } from '@/constants/suggestedCategories';

export default function SuggestedCategoriesComponent() {
    return (
        <View className='mx-1 gap-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 mt-2'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>Popular Categories</Text>
                <Link href={"/(root)/(tabs)/crates"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>
            <FlatList
                data={SuggestedCategories}
                renderItem={({ item }) => (
                    <CategoryCard
                        sizeVariant='small'
                        title={item.title}
                        imageSource={item.imageSource}
                        backgroundImage={item.backgroundImage}
                        onPress={() => router.push(`/(root)/product-category/1`)}
                    />
                )}
                keyExtractor={(item) => item.title}
                horizontal
                contentContainerStyle={{ gap: 6 }}
                contentContainerClassName='pb-5 px-2'
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}