import { View, Text, Dimensions } from 'react-native';
import Action from './Action';
import Website from '@/assets/svgs/Action/website';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { copyToClipboard, onShare } from '@/lib/utilities';
import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';

export default function ActionTray() {
    const { location, name } = useSpecificStorage();

    const payload = `Hey! I found a great Cold Hub storage location at ${location}. - ${name}`;

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
                router.push(`/(root)/map?name=${name}`);
            }
        },
        {
            title: "Share",
            Icon: <Feather
                name='share-2'
                size={30}
                color='#0066e1'
            />,
            onPress: () => onShare(payload)
        },
        {
            title: "Copy Address",
            Icon: <Feather
                name='copy'
                size={30}
                color='#0066e1'
            />,
            onPress: () => copyToClipboard(location)
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