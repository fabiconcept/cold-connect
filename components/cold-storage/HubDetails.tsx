import { View, Text } from 'react-native';
import InfoPill from '../general sub components/InfoPill';
import { FontAwesome } from '@expo/vector-icons';

export default function HubDetails() {
    return (
        <View className='py-7 px-2 gap-1 border-b border-gray-200'>
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-bold font-MontserratBold'>Avu/Obinze Hub</Text>
                <InfoPill className='bg-green-500' title='Active' />
            </View>
            <View className='flex-row gap-1'>
                <FontAwesome
                    name="star"
                    size={20}
                    color="#fec50c"
                />
                <FontAwesome
                    name="star"
                    size={20}
                    color="#fec50c"
                />
                <FontAwesome
                    name="star"
                    size={20}
                    color="#fec50c"
                />
                <FontAwesome
                    name="star"
                    size={20}
                    color="#fec50c"
                />
                <FontAwesome
                    name="star-half-full"
                    size={20}
                    color="#fec50c"
                />
            </View>
            <Text>Carrot Market, Avu, Owerri, Imo State</Text>
        </View>
    )
}