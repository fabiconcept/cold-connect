import Header from '@/components/Storage/Header';
import FilterSection from '@/components/Storage/FilterSection';
import { Text, View } from 'react-native';
import Storages from '@/components/Storage/Storages';

export default function Storage() {

    return (
        <View className='flex-1'>
            <Header />
            <FilterSection />
            <Storages />
        </View>
    )
}