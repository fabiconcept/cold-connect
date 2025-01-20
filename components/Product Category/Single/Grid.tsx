import { View, FlatList } from 'react-native';
import ItemCard from './ItemCard';
import { router } from 'expo-router';

export default function Grid() {
    const dummyCategories = [
        {
            title: 'Fish',
            imageSource: require("@/assets/images/cold/fish-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 1.png")
        },
        {
            title: 'Beverage',
            imageSource: require("@/assets/images/cold/bev-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 6.png")
        },
        {
            title: 'Dairy',
            imageSource: require("@/assets/images/cold/milk-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 3.png")
        },
        {
            title: 'Fruits',
            imageSource: require("@/assets/images/cold/fruits-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 4.png")
        },
        {
            title: 'Meat',
            imageSource: require("@/assets/images/cold/meat-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 5.png")
        },
        {
            title: 'Vegetables',
            imageSource: require("@/assets/images/cold/veg-large.png"),
            backgroundImage: require("@/assets/images/cold/Frame 2.png")
        },
    ]

    return (
        <View className='mt-5'>
            <FlatList
                data={dummyCategories}
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