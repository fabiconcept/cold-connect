import Flutter from '@/assets/svgs/Payment/flutter';
import { View, Text } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { useState } from 'react';

export default function PaymentOption({
    label,
    SVG,
}: {
    label: string;
    SVG: React.JSX.Element;
}) {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <View className='bg-white rounded-xl overflow-hidden border border-gray-300 shadow-xl shadow-black/30 p-2 gap-1 flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
                <View className='h-[65px] w-[65px] rounded-lg border border-gray-200 items-center justify-center'>
                    {SVG}
                </View>
                <Text className='text-lg font-semibold'>{label}</Text>
            </View>
            <Checkbox
                label={""}
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                checkedColor='#04B90B'
                containerStyle='mr-2'
            />
        </View>
    )
}