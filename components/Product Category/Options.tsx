import { View, Text } from 'react-native';
import Counter from '../general sub components/Counter';

export default function Options() {
    return (
        <View className='flex-wrap gap-2 flex-row justify-center pb-8 border-b border-gray-200'>
            <Counter sizeVariant='small' title='Number of Crates' />
            <Counter sizeVariant='small' title='Number of Days' />
            <Counter sizeVariant='small' title='Temperature' />
        </View>
    )
}