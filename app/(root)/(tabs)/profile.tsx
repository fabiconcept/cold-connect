import Header from '@/components/Profile/Header';
import InformationSection from '@/components/Profile/InformationSection';
import InvoicesCard from '@/components/Profile/InvoicesCard';
import ProfilePhotoContainer from '@/components/Profile/ProfilePhotoContainer';
import { InformationItem, InformationActionItem } from '@/types/types';
import { useAuth } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const { signOut } = useAuth();

    const handleSignOut = () => {
        console.log('signing out');
        signOut();
        router.replace('/(auth)/sign-in');
    }
    const dummyData: InformationItem[] = [
        {
            title: "Full Name:",
            value: "Jeffrey Dahmer",
            editable: true,
            type: "text"
        },
        {
            title: "Username:",
            value: "@milwaukee",
            editable: false,
            type: "text"
        },
        {
            title: "Email Address:",
            value: "jeffrey.dahmer@gmail.com",
            editable: false,
            type: "text"
        },
        {
            title: "Phone Number:",
            value: "+1 (123) 456-7890",
            editable: true,
            type: "text"
        },
    ]

    const dummyAddressInformation: (InformationItem | InformationActionItem)[] = [
        {
            title: "Address:",
            value: "123 Main Street, Milwaukee, WI 53201",
            editable: true,
            type: "text"
        },
        {
            title: "Country:",
            value: "Nigeria",
            editable: false,
            type: "text"
        }, {
            title: "Logout",
            Icon: "log-out",
            action: handleSignOut,
            type: "action",
            themeColor: "red"
        }
    ]
    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle={"dark-content"} />
            <Image
                source={require("@/assets/images/cold/profile-ice-top.png")}
                resizeMode='contain'
                className='absolute top-0 left-0'
            />
            <Image
                source={require("@/assets/images/cold/profile-ice-bottom.png")}
                resizeMode='contain'
                className='absolute bottom-0 right-0'
            />
            <ScrollView className='px-3'>
                <Header />
                <ProfilePhotoContainer />
                <InvoicesCard />
                <InformationSection
                    data={dummyData}
                    title="Personal Information"
                />
                <InformationSection
                    data={dummyAddressInformation}
                    title="Billing Information"
                />
                <View className='h-32'></View>
            </ScrollView>
        </SafeAreaView >
    )
}