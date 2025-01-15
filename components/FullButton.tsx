import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { ButtonProps } from '@/types/button';

export default function FullButton(props: ButtonProps) {
    return (
        <TouchableOpacity
            className={clsx(
                "py-4 rounded-lg",
                props.className
            )}
            {...props}
        >
            <Text className={clsx('text-center text-white text-base', props.textClassName)}>{props.title}</Text>
        </TouchableOpacity>
    )
}