import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({
    data,
    IconLeft,
    IconRight,
    dropdownStyle,
    onSelect,
    defaultValue
}: {
    data: {
        label: string;
        value: string;
    }[];
    defaultValue?: string;
    IconLeft?: React.JSX.Element;
    IconRight?: React.JSX.Element;
    dropdownStyle?: StyleProp<ViewStyle>;
    onSelect: (value: string) => void;
}) => {
    const [value, setValue] = useState<string | null>(defaultValue || null);

    const handleSelect = (value: string) => {
        setValue(value);
        onSelect(value);
    };

    return (
        <Dropdown
            style={[styles.dropdown, dropdownStyle, {
                flex: 1,
            }]}
            data={data}

            labelField="label"
            valueField="value"
            placeholder="Select Pickup Location"
            value={value}
            onChange={item => {
                handleSelect(item.value);
            }}
            renderLeftIcon={() => IconLeft as any}
            renderRightIcon={() => IconRight as any}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderColor: '#e5e7eb',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 17,
    },
});

export default DropdownComponent;