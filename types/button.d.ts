import { TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    className?: string;
    textClassName?: string;
    iconLeft?: React.ComponentType<any>;
    iconRight?: React.ComponentType<any>;
    containerClassName?: string;
}