import { ActivityIndicator, Text, View } from 'react-native';
import clsx from 'clsx';
import { ButtonProps } from '@/types/button';
import AnimatedPressable from './general sub components/AnimatedPress';

export default function FullButton(props: ButtonProps) {
    const {
        iconLeft: IconLeft,
        iconRight: IconRight,
        containerClassName = "w-full",
        canProceed = true,
        loading = false
    } = props;

    return (
        <AnimatedPressable
            containerClassName={containerClassName}
            onPress={props.onPress}
            disabled={!canProceed}
        >
            <View
                className={clsx(
                    "py-4 rounded-xl flex-row items-center justify-center",
                    props.className,
                )}
                {...props}
            >
                {loading && <ActivityIndicator
                    size={22}
                    color={"#0066e1"}
                />}
                {!loading && <>
                    {IconLeft && <IconLeft />}
                    <Text className={clsx('text-center text-base', props.textClassName)}>{props.title}</Text>
                    {IconRight && <IconRight />}
                </>}
            </View>
        </AnimatedPressable >
    )
}