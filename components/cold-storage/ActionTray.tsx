import { View } from 'react-native';
import Action from './Action';
import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';
import { StorageActions } from '@/constants/StorageActions';

export default function ActionTray() {
    const { location, name } = useSpecificStorage();

    const payload = `Hey! I found a great Cold Hub storage location at ${location}. - ${name}`;

    return (
        <View className='flex-row gap-2 px-2 py-5 justify-center border-b border-gray-200'>
            {StorageActions({ payload, location }).map((item, index) => (
                <Action key={index} title={item.title} Icon={item.Icon} onPress={item.onPress} />
            ))}
        </View>
    )
}