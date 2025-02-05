import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function DateTimePickerComponent({ IconLeft, IconRight, onDateChange, date: dateText }: {
    IconLeft?: React.JSX.Element,
    IconRight?: React.JSX.Element,
    date: string | null,
    onDateChange: (date: Date) => void
}) {
    const [date, setDate] = useState<Date | null>(dateText ? new Date(dateText) : null);
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    useEffect(() => {
        if (date) {
            onDateChange(date);
        }
    }, [date]);
    return (
        <TouchableOpacity
            className='flex-row items-center justify-between p-5 bg-white rounded-xl border border-gray-200'
            onPress={() => setShow(true)}
        >
            {IconLeft && IconLeft}
            {date && <Text className='flex-1'>{date.toDateString()}</Text>}
            {!date && <Text className='flex-1'>Pick up date</Text>}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    minimumDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            {IconRight && IconRight}
        </TouchableOpacity>
    )
}