import { Text, View } from 'react-native';
import clsx from 'clsx';
import { ButtonProps } from '@/types/button';
import AnimatedPressable from './general sub components/AnimatedPress';

export default function FullButton(props: ButtonProps) {
    const {
        iconLeft: IconLeft,
        iconRight: IconRight
    } = props;

    return (
        <AnimatedPressable
            containerClassName={props.containerClassName}
        >
            <View
                className={clsx(
                    "py-4 rounded-xl flex-row items-center justify-center",
                    props.className
                )}
                {...props}
            >
                {IconLeft && <IconLeft />}
                <Text className={clsx('text-center text-base', props.textClassName)}>{props.title}</Text>
                {IconRight && <IconRight />}
            </View>
        </AnimatedPressable >
    )
}