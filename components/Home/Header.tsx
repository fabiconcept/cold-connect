import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import InputField from '../Form/InputField';
import { Link, router } from 'expo-router';
import { useLocationStore } from '@/store';
import { useAuthenticationStore } from '@/store/auth';
import { useState } from 'react';

export default function Header() {
    const { address, hasLocationPermission } = useLocationStore();
    const { activeUser, isSignedIn } = useAuthenticationStore();
    const [searchText, setSearchText] = useState('');
    return (
        <View className='bg-primary p-5 rounded-br-[40px] rounded-bl-[40px]'>
            <View className='flex flex-row justify-end mt-10 mb-3'>
                {isSignedIn ? (
                    <Link href={"/(root)/(tabs)/profile"} className='p-1 bg-white h-[52px] w-[52px] overflow-hidden items-center justify-center rounded-full'>
                        <View className='h-[52px] w-[52px] overflow-hidden items-center justify-center rounded-full'>
                            <Image
                                source={activeUser.profile.photo ? { uri: activeUser.profile.photo } : require("@/assets/images/cold/no-user.png")}
                                height={50}
                                width={50}
                            />
                        </View>
                    </Link>
                ) : (
                    <View className='p-1 h-[52px] w-[52px]'>

                    </View>
                )}
            </View>
            <View>
                <Text className='text-white mx-5'>
                    {!isSignedIn ? "Hello there, " : ""}
                    {activeUser?.full_name}
                </Text>
                <Text className='text-white mx-5 text-3xl font-MontserratSemiBold'>
                    <Text className='w-[100px]' numberOfLines={1}>{`${hasLocationPermission ? address : "Nigeria, No where!"} `}</Text>
                    <Feather name="map-pin" size={24} className='ml-2' color="white" />
                </Text>
                <View className='relative'>
                    <InputField
                        label=''
                        secureTextEntry={false}
                        keyboardType='default'
                        icon={require("@/assets/images/cold/search.png")}
                        placeholder='Search For a Cold Storage'
                        containerStyle='rounded-full mt-2 px-4 flex-1'
                        iconStyle='opacity-60'
                        fullyRounded={true}
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={() => {
                            if (searchText.trim()) {
                                router.push(`/(root)/(tabs)/storage?searchQuery=${encodeURIComponent(searchText)}`);
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    )
}