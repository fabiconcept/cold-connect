import { View } from 'react-native';
import React from 'react';
import Counter from '../general sub components/Counter';
import TruckOption from './TruckOption';
import TruckSmall from '@/assets/svgs/logistics/truck-small';
import TruckLarge from '@/assets/svgs/logistics/truck-large';

export default function Options() {
    return (
        <View className='px-4 flex-wrap gap-2 flex-row'>
            <Counter title='Crate Quantity' />
            <Counter title='Box Quantity' />
            <TruckOption
                title='10 Ton'
                TruckImage={<TruckSmall
                    width={150}
                    height={100}
                />}
                loadLimit='25,000 kg'
                price='50,000 ₦'
            />
            <TruckOption
                title='20 Ton'
                TruckImage={<TruckLarge
                    width={150}
                    height={100}
                />}
                loadLimit='50,000 kg'
                price='80,000 ₦'
            />
        </View>
    )
}