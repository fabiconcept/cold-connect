import { useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    NativeSyntheticEvent,
    TextInputKeyPressEventData
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FullButton from '@/components/FullButton';
import { useSignUp } from '@clerk/clerk-expo';
import { maskEmail } from '@/lib/utilities';
import clsx from 'clsx';
import AuthFetch from '@/lib/Classes/AuthFetch';

export default function Verify(): JSX.Element {
    const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const { isLoaded, signUp, setActive } = useSignUp();
    const [loading, setLoading] = useState(false);
    const { email, name, password } = useLocalSearchParams<{
        email: string,
        password: string,
        name: string
    }>();

    const [error, setError] = useState('');


    const handlePinChange = (value: string, index: number): void => {
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ): void => {
        if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const canProceed = pin.join("").length === 6;

    const handleVerification = async () => {
        if (!isLoaded) return;
        if (!canProceed || loading) return;

        try {
            setLoading(true);
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: pin.join(''),
            })

            if (signUpAttempt.status === 'complete') {
                const authFetch = new AuthFetch();

                await authFetch.signUp({
                    email: decodeURI(email),
                    name: decodeURI(name),
                    password: decodeURI(password)
                });

                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace({
                    pathname: '/(root)/(tabs)/home',
                    params: {
                        status: "new-account"
                    }
                });
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            setError('An error occurred during verification');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className='flex-1 p-3 justify-center items-center'>
            <TouchableOpacity
                onPress={() => router.back()}
                className='absolute top-10 left-3 w-14 h-14 justify-center items-center aspect-square bg-white shadow rounded-full z-20'
            >
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
                <Text className='text-primary text-3xl font-MontserratSemiBold'>
                    Verify this Device
                </Text>
                <Text className='font-MontserratSemiBold opacity-60 max-w-[90%] mt-2'>
                    {`Hi {User name}, please enter the 6-digit security code we've sent you at ${maskEmail(email)}.`}
                </Text>
            </View>

            <View className='flex-row gap-1 justify-center items-center my-10'>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <KeyboardAvoidingView
                        key={index}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => inputRefs.current[index]?.focus()}
                        >
                            <View className='w-[48px] items-center justify-center border border-gray-300 rounded-xl'>
                                <TextInput
                                    ref={ref => {
                                        inputRefs.current[index] = ref;
                                    }}
                                    keyboardType='number-pad'
                                    style={{
                                        fontSize: 30,
                                        textAlign: 'center',
                                        paddingVertical: 8,
                                    }}
                                    value={pin[index]}
                                    onChangeText={(value: string) => handlePinChange(value, index)}
                                    onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
                                        handleKeyPress(e, index)
                                    }
                                    maxLength={1}
                                    placeholder='0'
                                    placeholderTextColor="#9CA3AF"
                                    selectTextOnFocus={true}
                                    autoCapitalize="none"
                                    editable={!canProceed}
                                    autoCorrect={false}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                ))}
            </View>

            <FullButton
                title={canProceed ? 'Verify' : "Enter PIN."}
                className={clsx(
                    'py-4 rounded-xl',
                    canProceed ? "bg-primary text-white" : "bg-primary/20"
                )}
                textClassName={clsx(
                    'font-MontserratSemiBold',
                    canProceed ? "text-white" : "text-primary"
                )}
                onPress={handleVerification}
                loading={loading}
                canProceed={canProceed}
            />
            {error && (
                <Text className='text-center mt-10 font-MontserratSemiBold text-red-600'>
                    {error}
                </Text>
            )}
        </SafeAreaView>
    );
}