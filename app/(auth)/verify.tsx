import InputField from '@/components/Form/InputField';
import FullButton from '@/components/FullButton';
import { router } from 'expo-router';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function verify() {
    return (
        <SafeAreaView className='flex-1 p-3 justify-center items-center'>
            <TouchableOpacity onPress={() => router.back()} className='absolute top-10 left-3 w-14 h-14 justify-center items-center aspect-square bg-white shadow rounded-full z-20'>
                <Image
                    source={require("@/assets/images/cold/back.png")}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <Image
                source={require("@/assets/images/cold/verify-ice-01.png")}
                resizeMode='contain'
                className='absolute bottom-[10%] right-0'
            />
            <Image
                source={require("@/assets/images/cold/verify-ice-02.png")}
                resizeMode='contain'
                className='absolute top-[10%] left-0'
            />

            <View className='items-center'>
                <Text className='text-primary text-3xl font-MontserratSemiBold'>Verify this Device</Text>
                <Text className='font-MontserratSemiBold opacity-60 max-w-[90%] mt-2'>
                    {`Hi {User name}, please enter the 4-digit security code we’ve sent you at user**********@***.com.`}
                </Text>
            </View>

            <View className='flex-row gap-2 justify-center items-center my-10'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <InputField
                            keyboardType='number-pad'
                            className='w-[74px] items-center justify-center'
                            inputStyle='text-[40px] text-center py-3 bg-transparent'
                            label=''
                            maxLength={1}
                            placeholder='0'
                        />
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <InputField
                            keyboardType='number-pad'
                            className='w-[74px] items-center justify-center'
                            inputStyle='text-[40px] text-center py-3 bg-transparent'
                            label=''
                            maxLength={1}
                            placeholder='0'
                        />
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <InputField
                            keyboardType='number-pad'
                            className='w-[74px] items-center justify-center'
                            inputStyle='text-[40px] text-center py-3 bg-transparent'
                            label=''
                            maxLength={1}
                            placeholder='0'
                        />
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <InputField
                            keyboardType='number-pad'
                            className='w-[74px] items-center justify-center'
                            inputStyle='text-[40px] text-center py-3 bg-transparent'
                            label=''
                            maxLength={1}
                            placeholder='0'
                        />
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>

            <FullButton
                title='Verify'
                className='bg-primary rounded-xl w-full py-4'
                textClassName='text-white'
            />
            <Text className='text-center mt-10 font-MontserratSemiBold text-gray-500'>
                Resend in 30s
            </Text>
        </SafeAreaView>
    )
}