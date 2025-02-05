import { View } from 'react-native';
import React, { useRef } from 'react';
import Header from '@/components/Product Category/Header';
import BackBlur from '@/components/Product Category/BackBlur';
import ProductPic from '@/components/Product Category/ProductPic';
import InfoPill from '@/components/general sub components/InfoPill';
import Details from '@/components/Product Category/Details';
import Options from '@/components/Product Category/Options';
import InformationSheet from '@/components/general sub components/InformationSheet';
import SuggestedCategories from '@/components/Product Category/SuggestedCategories';
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from '@/components/general sub components/ActionSheet';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ProductPageItem } from '@/constants/ProductPage';
import { useProducts } from '@/store/Products';

export default function ProductCategory() {
    const { id } = useLocalSearchParams<{ id: string; }>();
    const { products, toggleAddedToCart, addProduct } = useProducts();
    const productInfoExists = products.find(product => product.title.includes(id.toLowerCase()));

    const scrollViewRef = useRef<ScrollView>(null);

    // This will work with both navigation and URL changes
    useFocusEffect(
        React.useCallback(() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }, [id])
    );


    if (!id) return null;

    const productInfo = ProductPageItem.find(item => item.title.includes(id.toLowerCase()))!;

    return (
        <View className='relative flex-1'>
            <Header />
            <BackBlur source={productInfo.backgroundImage} />
            <InformationSheet showHandle={false} className='px-4 flex-1'>
                <ProductPic source={productInfo.imageSource} />
                <ScrollView
                    className='flex-1 -mt-6'
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    <View className='flex-row gap-1 px-1'>
                        <InfoPill
                            title={'Category'}
                        />
                    </View>
                    <Details
                        title={productInfo.title}
                        measurement={productInfo.measurement}
                        description={productInfo.description}
                        price={productInfo.price}
                    />
                    <Options selectedCategory={productInfo.title} rate={productInfo.price} />
                    <SuggestedCategories selectedCategory={productInfo.title} />
                    <View className='h-24'></View>
                </ScrollView>
            </InformationSheet>
            <ActionSheet
                action={() => {
                    if (!productInfoExists) {
                        addProduct({
                            title: productInfo.title as "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables",
                            quantity: 1,
                            rate: productInfo.price,
                            storageLength: 1,
                            type: "storage" as const
                        });
                    }

                    toggleAddedToCart(productInfo.title as "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables")
                }}
                inCart={productInfoExists?.addedToCart ?? false}
                value={productInfoExists ? (productInfoExists.quantity * productInfo.price * productInfoExists.storageLength) : productInfo.price}
            />
        </View>
    )
}