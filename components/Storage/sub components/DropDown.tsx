import { DropdownProps } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';


const CustomDropdown: React.FC<DropdownProps> = ({
    options,
    onSelect,
    placeholder = 'Select an option',
    containerStyle,
    dropdownStyle,
    optionStyle,
    textStyle,
    selectedTextStyle,
    placeholderStyle,
    activeOpacity = 0.7,
    disabled = false,
    IconRight,
    IconLeft,
    containerClassName
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: any } | null>(null);

    // Animation values
    const rotateValue = useSharedValue(0);
    const dropdownHeight = useSharedValue(0);
    const maxHeight = options.length * 50; // Assuming each option is 50px high

    // Handle dropdown toggle
    const toggleDropdown = useCallback(() => {
        if (disabled) return;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);

        rotateValue.value = withTiming(isOpen ? 0 : 1, {
            duration: 300,
        });

        dropdownHeight.value = withTiming(isOpen ? 0 : maxHeight, {
            duration: 300,
        });
    }, [isOpen, disabled, maxHeight]);

    // Handle option selection
    const handleSelect = (option: { label: string; value: any }) => {
        setSelectedOption(option);
        onSelect(option.value);
        toggleDropdown();
    };

    // Chevron animation style
    const chevronStyle = useAnimatedStyle(() => {
        const rotation = interpolate(
            rotateValue.value,
            [0, 1],
            [0, 180],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ rotate: `${rotation}deg` }],
        };
    });

    // Dropdown animation style
    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: dropdownHeight.value,
            opacity: interpolate(
                dropdownHeight.value,
                [0, maxHeight / 2],
                [0, 1],
                Extrapolate.CLAMP
            ),
        };
    });

    return (
        <View className="relative w-full z-[1000]" style={containerStyle}>
            <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={toggleDropdown}
                disabled={disabled}
                className={`flex-row items-center justify-between p-3 gap-2 bg-white rounded-xl border border-gray-200 ${disabled ? 'opacity-50' : ''
                    } ${containerClassName}`}
                style={dropdownStyle}
            >
                {IconLeft && IconLeft}
                <Text
                    className="text-base text-gray-700"
                    style={[
                        textStyle,
                        selectedOption ? selectedTextStyle : placeholderStyle,
                    ]}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Animated.View className="w-5 h-5 items-center justify-center" style={chevronStyle}>
                    {IconRight && IconRight}
                </Animated.View>
            </TouchableOpacity>

            <Animated.View
                className="absolute top-full left-0 right-0 bg-white rounded-xl border border-gray-200 mt-1 overflow-hidden max-h-[100px]"
                style={[dropdownAnimatedStyle]}
            >
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        className={clsx(
                            "p-3 border-b border-gray-300",
                            option.value === selectedOption?.value && "bg-gray-100"
                        )}
                        style={optionStyle}
                        onPress={() => handleSelect(option)}
                        activeOpacity={activeOpacity}
                    >
                        <Text className="text-base text-gray-700" style={textStyle}>
                            {option.label + " "}
                            {option.value === selectedOption?.value && (
                                <Feather name="check" size={16} color="green" />
                            )}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

export default CustomDropdown;