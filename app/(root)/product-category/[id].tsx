import { View } from 'react-native';
import React from 'react';
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
import { useLocalSearchParams } from 'expo-router';
import { ProductPageItem } from '@/constants/ProductPage';

export default function ProductCategory() {
    const { id } = useLocalSearchParams<{ id: string; }>();

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
                    <Options />
                    <SuggestedCategories selectedCategory={productInfo.title} />
                    <View className='h-24'></View>
                </ScrollView>
            </InformationSheet>
            <ActionSheet
                action={() => { }}
                actionText='Add to Cart'
                value={2700}
            />
        </View>
    )
}