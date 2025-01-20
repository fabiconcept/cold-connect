import { Link, router } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import CategoryCard from '../Home/sub components/categoryCard';

const dummyCategories = [
    {
        title: 'Fish',
        imageSource: require("@/assets/images/cold/fish-small.png"),
        backgroundImage: require("@/assets/images/cold/Frame 1.png")
    },
    {
        title: 'Beverage',
        imageSource: require("@/assets/images/cold/bev-small.png"),
        backgroundImage: require("@/assets/images/cold/Frame 6.png")
    },
    {
        title: 'Dairy',
        imageSource: require("@/assets/images/cold/dairy-small.png"),
        backgroundImage: require("@/assets/images/cold/Frame 3.png")
    },
    {
        title: 'Fruits',
        imageSource: require("@/assets/images/cold/fruits-small.png"),
        backgroundImage: require("@/assets/images/cold/Frame 4.png")
    },
    {
        title: 'Meat',
        imageSource: require("@/assets/images/cold/meat-small.png"),
        backgroundImage: require("@/assets/images/cold/Frame 5.png")
    },
    {
        title: 'Vegetable',
        imageSource: require("@/assets/images/cold/vegetable.png"),
        backgroundImage: require("@/assets/images/cold/Frame 2.png")
    },
]

export default function SuggestedCategories() {
    return (
        <View className='mx-1 gap-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 mt-2'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>Popular Categories</Text>
                <Link href={"/(root)/(tabs)/crates"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>
            <FlatList
                data={dummyCategories}
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