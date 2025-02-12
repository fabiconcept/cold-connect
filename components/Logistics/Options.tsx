import { View } from 'react-native';
import React from 'react';
import Counter from '../general sub components/Counter';
import TruckOption from './TruckOption';
import TruckSmall from '@/assets/svgs/logistics/truck-small';
import TruckLarge from '@/assets/svgs/logistics/truck-large';
import { useLogisticsStore } from '@/store/Logistics';

export default function Options() {

    const { boxQuantity, setBoxQuantity, quantity, setQuantity } = useLogisticsStore();

    const crateQuantityValueChange = (value: number) => {
        setQuantity(value);
    }

    const boxQuantityValueChange = (value: number) => {
        setBoxQuantity(value);
    }

    return (
        <View className='px-4 flex-wrap gap-2 flex-row'>
            <Counter defaultValue={quantity} onValueChange={crateQuantityValueChange} title='Crate Quantity' />
            <Counter defaultValue={boxQuantity} onValueChange={boxQuantityValueChange} title='Box Quantity' />
            <TruckOption
                title='10 Ton'
                TruckImage={<TruckSmall
                    width={150}
                    height={100}
                />}
                type='medium'
                loadLimit='25,000 kg'
                price='50,000 ₦'
            />
            <TruckOption
                title='100 Ton'
                TruckImage={<TruckLarge
                    width={150}
                    height={100}
                />}
                type='large'
                loadLimit='50,000 kg'
                price='80,000 ₦'
            />
        </View>
    )
}