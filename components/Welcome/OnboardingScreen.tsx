import clsx from 'clsx';
import { View, Text, Image, Dimensions } from 'react-native';

export default function OnboardingScreen(props: OnBoardingScreenProps) {
    return (
        <View className="overflow-hidden pb-10" style={{
            maxWidth: Dimensions.get("window").width,
            overflow: "hidden",
        }}>
            <Text className="text-xl font-MontserratSemiBold font-semibold text-center absolute top-20 left-1/2 -translate-x-1/2 z-20">{props.title}</Text>
            <View style={{ width: 430, height: 500, overflow: "hidden" }}>
                {<props.SVG />}
            </View>
            <Image
                source={props.imageSource}
                width={377}
                height={250}
                className={clsx(
                    "absolute z-10",
                    props.classname
                )}
            />
            <Text
                className='text-lg pt-20 font-MontserratSemiBold font-semibold text-center max-w-[80%] mx-auto'
                style={{
                    paddingTop: 80
                }}
            >
                {props.subtitle}
            </Text>
        </View>
    )
}