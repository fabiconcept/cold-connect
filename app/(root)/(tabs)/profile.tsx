import Header from '@/components/Profile/Header';
import InformationSection from '@/components/Profile/InformationSection';
import InvoicesCard from '@/components/Profile/InvoicesCard';
import ProfilePhotoContainer from '@/components/Profile/ProfilePhotoContainer';
import { InformationItem, InformationActionItem } from '@/types/types';
import { Image, RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthenticationStore } from '@/store/auth';
import { router } from 'expo-router';

export default function Profile() {
    const { signOut, activeUser, isSignedIn, activeId, updateUser, updatingUser } = useAuthenticationStore();

    if (!isSignedIn) {
        router.replace('/(auth)/sign-in');
        return null;
    }

    const profileData: InformationItem[] = [
        {
            title: "Full Name:",
            value: activeUser.full_name,
            editable: true,
            type: "text"
        },
        {
            title: "Username:",
            value: "@" + (activeUser.username),
            editable: false,
            type: "text"
        },
        {
            title: "Email Address:",
            value: activeUser.email,
            editable: false,
            type: "text"
        },
        {
            title: "Phone Number:",
            value: activeUser.profile?.phone || "N/A",
            editable: true,
            type: "text"
        },
    ]

    const dummyAddressInformation: (InformationItem | InformationActionItem)[] = [
        {
            title: "Address:",
            value: activeUser.profile?.address || "N/A",
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
            action: signOut,
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
            <ScrollView
                className='px-3'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={updatingUser}
                        colors={["#0066e1"]}
                        onRefresh={() => updateUser(activeId)}
                    />
                }

            >
                <Header firstName={activeUser.full_name.split(" ")[0]} />
                <ProfilePhotoContainer
                    photo={activeUser?.profile?.photo || ""}
                />
                <InvoicesCard />
                <InformationSection
                    data={profileData}
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