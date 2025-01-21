import { FlatListProps, PressableProps, TextInputProps } from "react-native";

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
    checkedColor?: string;
}

declare interface SwiperProps<T> extends FlatListProps<T> {
}

declare interface DropdownProps {
    options: Array<{ label: string; value: any }>;
    onSelect: (value: any) => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    dropdownStyle?: StyleProp<ViewStyle>;
    optionStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    activeOpacity?: number;
    disabled?: boolean;
    IconRight?: React.JSX.Element;
    IconLeft?: React.JSX.Element;
    containerClassName?: string;
}

declare interface TruckOptionProps {
    title: string;
    loadLimit: string;
    price: string;
    TruckImage: React.JSX.Element;
}

declare interface InformationItem {
    title: string;
    value: string;
    editable: boolean;
}

declare interface AnimatedPressableProps extends PressableProps {
    children: React.ReactNode,
    className?: string,
    activeOpacity?: number,
    containerClassName?: string
}

declare interface InvoiceCardProps {
    id: string,
    date: Date,
    amount: string,
    status: "Paid" | "Pending" | "Cancelled" | "Failed"
}

declare interface CartItemProps {
    title: string;
    price: number;
    quantity: number;
    image: string;
    isLast?: boolean;
} 