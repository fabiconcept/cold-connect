import Header from '@/components/Profile/Header';
import InformationSection from '@/components/Profile/InformationSection';
import InvoicesCard from '@/components/Profile/InvoicesCard';
import ProfilePhotoContainer from '@/components/Profile/ProfilePhotoContainer';
import { InformationItem, InformationActionItem } from '@/types/types';
import { Image, RefreshControl, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthenticationStore } from '@/store/auth';
import { router } from 'expo-router';
import FullButton from '@/components/FullButton';

export default function Profile() {
    const { signOut, activeUser, isSignedIn, activeId, updateUser, updatingUser } = useAuthenticationStore();

    if (!isSignedIn) {
        // router.replace('/(auth)/sign-in');
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
                <View
                    className='px-3 justify-center flex-1'

                >
                    <Header firstName={""} />
                    <View className='bg-white p-3 rounded-2xl mt-8 border border-gray-300 shadow-lg shadow-black/10'>
                        <Text className='text-gray-500 mb-2 p-3 text-center'>
                            Create an account or log in to unlock the full Cold Connect experience—seamlessly book cold storage, arrange logistics with our cold trucks, track your orders in real time, and enjoy exclusive benefits tailored to your needs.
                        </Text>
                        <FullButton
                            title='Create an Account'
                            className='bg-primary w-full rounded-2xl py-4 mb-2'
                            textClassName='text-white font-semibold'
                            onPress={() => router.push('/(auth)/sign-up')}
                        />
                        <FullButton
                            title='Log In Your Account'
                            className='bg-primary/10 border border-primary w-full rounded-2xl py-4'
                            textClassName='text-primary font-semibold'
                            onPress={() => router.push('/(auth)/sign-in')}
                        />
                    </View>
                </View>
            </SafeAreaView >
        );
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
            action: () => signOut(activeId),
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