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
            style={styles.keyboardView}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[styles.container]} className={clsx('my-2 w-full', className)}>
                    <View
                        style={[styles.inputContainer]}
                        className={clsx(
                            'flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500',
                            containerStyle
                        )}
                    >
                        {icon && (
                            <Image
                                source={icon}
                                style={[styles.icon]}
                                className={clsx('w-6 h-6 ml-4', iconStyle)}
                            />
                        )}
                        <TextInput
                            {...props}
                            secureTextEntry={secureTextEntry}
                            style={[styles.input]}
                            className={clsx('rounded-full p-4 font-semibold text-[15px] flex-1 text-left', inputStyle)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        width: '100%',
    },
    container: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0000001a',
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    input: {
        borderRadius: 9999,
        padding: 16,
        fontWeight: '600',
        fontSize: 15,
        flex: 1,
        textAlign: 'left',
    },
});