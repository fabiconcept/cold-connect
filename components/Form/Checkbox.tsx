import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckboxProps } from '@/types/types';
import clsx from 'clsx';

export default function Checkbox({
    label,
    checked,
    onPress,
    containerStyle,
    labelStyle,
    checkedColor
}: CheckboxProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            className={clsx('flex-row items-center', containerStyle)}
        >
            <View
                style={[
                    styles.checkbox,
                    checked && !checkedColor && styles.checked,
                    checked && checkedColor && { backgroundColor: checkedColor, borderColor: checkedColor },
                ]}
                className={clsx(
                    'w-5 h-5 rounded border border-neutral-300 items-center justify-center',
                )}
            >
                {checked && (
                    <View style={styles.checkmark} className="w-2 h-2 bg-white rounded-sm" />
                )}
            </View>
            {label && (
                <Text
                    style={styles.label}
                    className={clsx('text-sm text-neutral-600 ml-2', labelStyle)}
                >
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#0066FF',
        borderColor: '#0066FF',
    },
    checkmark: {
        width: 8,
        height: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    label: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 8,
    },
});
