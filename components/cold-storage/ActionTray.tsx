import { View, Text, Dimensions } from 'react-native';
import Action from './Action';
import Website from '@/assets/svgs/Action/website';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { onShare } from '@/lib/utilities';

export default function ActionTray({ hubName }: {
    hubName: string
}) {
    const dummyActions = [
        {
            title: "Visit Webiste",
            Icon: <Website
                width={"100%"}
                height={"100%"}
            />,
            onPress: () => {
                console.log("Visit Webiste");
            }
        },
        {
            title: "Call Hub",
            Icon: <Feather
                name='phone-call'
                size={30}
                color='#0066e1'
            />,
            onPress: () => {
                console.log("Call Hub");
            }
        },
        {
            title: "Visit Map",
            Icon: <Feather
                name='map-pin'
                size={30}
                color='#0066e1'
            />,
            onPress: () => {
                router.push(`/(root)/map?name=${hubName}`);
            }
        },
        {
            title: "Share",
            Icon: <Feather
                name='share-2'
                size={30}
                color='#0066e1'
            />,
            onPress: onShare
        },
        {
            title: "Copy Address",
            Icon: <Feather
                name='copy'
                size={30}
                color='#0066e1'
            />,
            onPress: () => {
                console.log("Copy Address");
            }
        },
    ]
    return (
        <View className='flex-row gap-1 px-2 py-5 justify-center border-b border-gray-200'>
            {dummyActions.map((item, index) => (
                <Action key={index} title={item.title} Icon={item.Icon} onPress={item.onPress} />
            ))}
        </View>
    )
}