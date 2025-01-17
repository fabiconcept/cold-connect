import { View } from 'react-native';
import Counter from '../general sub components/Counter';
import ColorPicker from './ColorPicker';
import { Feather } from '@expo/vector-icons';
import DropdownComponent from './DropDownComponent';
import DateTimePickerComponent from './DateTimePickerComponent';

export default function Options() {
    const locations = [
        { label: 'Lagos', value: 'Lagos' },
        { label: 'Abuja', value: 'Abuja' },
        { label: 'Port Harcourt', value: 'Port Harcourt' },
        { label: 'Ibadan', value: 'Ibadan' },
        { label: 'Kano', value: 'Kano' },
        { label: 'Benin City', value: 'Benin City' },
        { label: 'Aba', value: 'Aba' },
        { label: 'Calabar', value: 'Calabar' },
        { label: 'Uyo', value: 'Uyo' },
    ];

    return (
        <View className='-mt-44 px-4 flex-wrap gap-2 flex-row'>
            <Counter title='Crate Quantity' />
            <ColorPicker />
            <View className='mt-2 flex-1 gap-2'>
                <DropdownComponent
                    data={locations}
                    IconLeft={<Feather
                        name="map-pin"
                        size={20}
                        color="black"
                        className='mr-3 opacity-50'
                    />}
                    IconRight={<Feather
                        name="chevron-down"
                        size={20}
                        color="black"
                    />}
                />
                <DateTimePickerComponent
                    IconLeft={<Feather
                        name="calendar"
                        size={20}
                        color="black"
                        className='mr-3 opacity-50'
                    />}
                    IconRight={<Feather
                        name="chevron-right"
                        size={20}
                        color="black"
                    />}
                />
            </View>
        </View>
    )
}