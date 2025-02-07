import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { copyToClipboard, onShare } from '@/lib/utilities';

export const StorageActions = ({ payload, location, name }: { payload: string, location: string, name: string }) => [
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