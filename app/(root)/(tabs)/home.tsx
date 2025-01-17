import Header from '@/components/Home/Header';
import PopularCategories from '@/components/Home/PopularCategories';
import AdCard from '@/components/Home/ad-card';
import ColdStoragesAroundMe from '@/components/Home/coldStoragesAroundMe';
import ColdStoragesNearMe from '@/components/Home/coldStoragesNearMe';
import { View, ScrollView, RefreshControl } from 'react-native';

export default function Home() {
    return (
        <ScrollView
            className='flex-1'
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => { }}
                />
            }
        >
            <Header />
            <AdCard />
            <PopularCategories />
            <ColdStoragesNearMe />
            <ColdStoragesAroundMe />
            <View className='h-32'></View>
        </ScrollView>
    )
}