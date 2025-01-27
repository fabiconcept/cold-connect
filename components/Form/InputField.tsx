import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Platform, Keyboard, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { InputFieldProps } from '@/types/types';
import clsx from 'clsx';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import AnimatedPressable from '../general sub components/AnimatedPress';

export default function InputField({
    label,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    fullyRounded = false,
    ...props
}: InputFieldProps) {
    const [loaded] = useFonts({
        'MontserratSemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }
    const [showPassword, setShowPassword] = useState(secureTextEntry);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className={clsx('w-full', className)}>
                    <View
                        className={clsx(
                            'flex flex-row justify-start items-center relative bg-neutral-100 border border-[#0000001a] focus:border-primary-500',
                            containerStyle,
                            fullyRounded ? 'rounded-full' : 'rounded-md'
                        )}
                    >
                        {icon && (
                            <Image
                                source={icon}

                                className={clsx('w-6 h-6 ml-4', iconStyle)}
                            />
                        )}
                        <TextInput
                            {...props}
                            keyboardType={showPassword ? undefined : "visible-password"}
                            secureTextEntry={showPassword}
                            className={clsx('rounded-full px-4 py-5 font-semibold text-[15px] flex-1 text-left', inputStyle)}
                        />
                        {secureTextEntry && <AnimatedPressable hitSlop={25} containerClassName='absolute right-3 opacity-50' onPress={() => setShowPassword(!showPassword)}>
                            <Feather
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                            />
                        </AnimatedPressable>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}