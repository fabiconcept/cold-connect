import { View, Text } from 'react-native';
import Action from './Action';
import Website from '@/assets/svgs/Action/website';
import { Feather } from '@expo/vector-icons';

export default function ActionTray() {
    const dummyActions = [
        {
            title: "Visit Webiste",
            Icon: <Website
                width={"100%"}
                height={"100%"}
            />
        },
        {
            title: "Call Hub",
            Icon: <Feather
                name='phone-call'
                size={30}
                color='#0066e1'
            />
        },
        {
            title: "Visit Map",
            Icon: <Feather
                name='map-pin'
                size={30}
                color='#0066e1'
            />
        },
        {
            title: "Share",
            Icon: <Feather
                name='share-2'
                size={30}
                color='#0066e1'
            />
        },
        {
            title: "Copy Address",
            Icon: <Feather
                name='copy'
                size={30}
                color='#0066e1'
            />
        },
    ]
    return (
        <View className='flex-row gap-1 px-2 py-5 justify-center border-b border-gray-200'>
            {dummyActions.map((item, index) => (
                <Action key={index} title={item.title} Icon={item.Icon} />
            ))}
        </View>
    )
}