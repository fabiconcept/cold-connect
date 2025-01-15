import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Platform, Keyboard, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { InputFieldProps } from '@/types/types';
import clsx from 'clsx';

export default function InputField({
    label,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) {
    const [loaded] = useFonts({
        'MontserratSemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className={clsx('w-full', className)}>
                    <View
                        className={clsx(
                            'flex flex-row justify-start items-center relative bg-neutral-100 rounded-md border border-[#0000001a] focus:border-primary-500',
                            containerStyle
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
                            secureTextEntry={secureTextEntry}

                            className={clsx('rounded-full px-4 py-5 font-semibold text-[15px] flex-1 text-left', inputStyle)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}