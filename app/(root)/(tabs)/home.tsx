import Header from '@/components/Home/Header';
import AdCard from '@/components/Home/ad-card';
import { View } from 'react-native';

export default function Home() {
    return (
        <View className='flex-1'>
            <Header />
            <AdCard />
        </View>
    )
}