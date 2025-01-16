import Header from '@/components/Home/Header';
import PopularCategories from '@/components/Home/PopularCategories';
import AdCard from '@/components/Home/ad-card';
import { View } from 'react-native';

export default function Home() {
    return (
        <View className='flex-1'>
            <Header />
            <AdCard />
            <PopularCategories />
        </View>
    )
}