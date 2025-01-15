import InputField from '@/components/Form/InputField';
import Checkbox from '@/components/Form/Checkbox';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SignIn() {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View className='relative flex-1'>
            <Image
                source={require("@/assets/images/cold/signIn-ice-01.png")}
                resizeMode='contain'
                className='absolute top-0 left-0'
            />
            <Image
                source={require("@/assets/images/cold/signIn-ice-02.png")}
                resizeMode='contain'
                className='absolute bottom-0 right-0'
            />
            <SafeAreaView className='flex-1 flex z-20 p-5' style={styles.container}>
                <View className='gap-2' style={styles.textContainer}>
                    <Text className='text-primary text-4xl font-MontserratSemiBold' style={styles.titleText}>Welcome Back,</Text>
                    <Text className='font-MontserratSemiBold opacity-70 max-w-[80%]'>We&apos;re excited to have you back, login your account to continue.</Text>
                </View>

                <View className='my-10' style={styles.inputContainer}>
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

                    <View className='flex flex-row justify-between items-center w-full bg-secondary mt-10'>
                        <Checkbox
                            label="Remember me"
                            checked={rememberMe}
                            onPress={() => setRememberMe(!rememberMe)}
                            containerStyle="mt-2"
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
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