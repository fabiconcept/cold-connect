import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({
    data,
    IconLeft,
    IconRight,
    dropdownStyle
}: {
    data: {
        label: string;
        value: string;
    }[];
    IconLeft?: React.JSX.Element;
    IconRight?: React.JSX.Element;
    dropdownStyle?: StyleProp<ViewStyle>;
}) => {
    const [value, setValue] = useState(null);

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
                setValue(item.value);
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