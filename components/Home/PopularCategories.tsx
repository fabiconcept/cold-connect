import { Link } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import CategoryCard from './sub components/categoryCard';

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

export default function PopularCategories() {
    return (
        <View className='mx-3'>
            <View className='flex-row items-center justify-between mx-2 mb-2'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>PopularCategories</Text>
                <Link href={"/(root)/(tabs)/crates"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>
            <FlatList
                data={dummyCategories}
                renderItem={({ item }) => (
                    <CategoryCard
                        title={item.title}
                        imageSource={item.imageSource}
                        backgroundImage={item.backgroundImage}
                    />
                )}
                keyExtractor={(item) => item.title}
                horizontal
                contentContainerStyle={{ gap: 8 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}