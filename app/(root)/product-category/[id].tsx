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

export default function ProductCategory() {
    return (
        <View className='relative flex-1'>
            <Header />
            <BackBlur />
            <InformationSheet showHandle={false} className='px-4 flex-1'>
                <ProductPic />
                <ScrollView
                    className='flex-1 -mt-6'
                    showsVerticalScrollIndicator={false}
                >
                    <View className='flex-row gap-1 px-1'>
                        <InfoPill
                            title='Category'
                        />
                    </View>
                    <Details />
                    <Options />
                    <SuggestedCategories />
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