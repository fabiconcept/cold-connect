import InputField from '@/components/Form/InputField';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link } from 'expo-router';
import FullButton from '@/components/FullButton';
import OAuth from '@/components/Form/OAuth';

export default function SignUp() {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View className='relative flex-1'>
            <ScrollView className='flex-1'>
                <Image
                    source={require("@/assets/images/cold/sign-up-ice 02.png")}
                    resizeMode='contain'
                    className='absolute top-0 right-0'
                />
                <Image
                    source={require("@/assets/images/cold/sign-up-ice 01.png")}
                    resizeMode='contain'
                    className='absolute bottom-0 left-1/2 -translate-x-1/2'
                />
                <SafeAreaView className='flex-1 flex z-20 p-5' style={styles.container}>
                    <View className='gap-2' style={styles.textContainer}>
                        <Text className='text-primary text-4xl font-MontserratSemiBold' style={styles.titleText}>Create an Account</Text>
                        <Text className='font-MontserratSemiBold opacity-70 max-w-[90%]'>
                            Create an account to access our premium services, including
                            Cold Logistics, Cold Storage, and Buy Crates.
                        </Text>
                    </View>

                    <View className='my-10' style={styles.inputContainer}>
                        <InputField
                            label=''
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/user.png")}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder='Full Name'
                            autoCorrect={false}
                        />
                        <InputField
                            label=''
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/at-sign.png")}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder='Email Address'
                            autoCorrect={false}
                        />
                        <InputField
                            label=''
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/lock.png")}
                            keyboardType='default'
                            autoCapitalize='none'
                            placeholder='Password'
                            autoCorrect={false}
                        />
                        <InputField
                            label=''
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/lock.png")}
                            keyboardType='default'
                            autoCapitalize='none'
                            placeholder='ReType password'
                            autoCorrect={false}
                        />

                        <FullButton
                            title='Continue'
                            onPress={() => { }}
                            className='bg-primary py-4 rounded-xl'
                            textClassName='font-MontserratSemiBold text-white'
                        />
                        <Text className='text-center opacity-70 my-5'>
                            By Logging in, you agree to our <Text className='font-MontserratSemiBold text-primary'>Terms & Conditions</Text> and
                            <Text className='font-MontserratSemiBold text-primary'>Privacy Policies</Text>.
                        </Text>

                        <View className='flex flex-row justify-center items-center gap-2 mt-5 mb-5'>
                            <View className='flex-1 h-px bg-gray-200'></View>
                            <Text className='italic opacity-70'>Or Sign Up With</Text>
                            <View className='flex-1 h-px bg-gray-200'></View>
                        </View>

                        <OAuth className='my-5' />


                        <Link href={"/(auth)/sign-in"} className='text-center'>
                            Already have an account?
                            <Text className='font-MontserratSemiBold text-primary'> Sign In</Text>
                        </Link>
                    </View>
                </SafeAreaView >
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textContainer: {
        gap: 5
    },
    titleText: {
        fontSize: 28,
        fontWeight: '600'
    },
    inputContainer: {
        marginBlock: 60,
        gap: 10
    },
})