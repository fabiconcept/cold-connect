import { FlatListProps, TextInputProps } from "react-native";

declare type OnBoardingScreenProps = {
    SVG: React.FC;
    title: string;
    imageSource: ImageSourcePropType;
    subtitle: string;
    classname?: string
}

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    fullyRounded?: boolean
}

declare interface CheckboxProps {
    label?: string;
    checked: boolean;
    onPress: () => void;
    containerStyle?: string;
    labelStyle?: string;
}

declare interface SwiperProps<T> extends FlatListProps<T> {
}