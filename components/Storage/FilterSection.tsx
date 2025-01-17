import { View, Text } from 'react-native';
import CustomDropdown from './sub components/DropDown';
import PlaceTarget from '@/assets/svgs/storage/place-target';
import ChevronDown from '@/assets/svgs/storage/chevron-down';
import AlphabeticalSort from '@/assets/svgs/storage/alphabetical-sort';

export default function FilterSection() {
    const options = [
        { label: 'South East Region', value: '0' },
        { label: 'South West Region', value: '1' },
        { label: 'North East Region', value: '2' },
        { label: 'North West Region', value: '3' },
        { label: 'North Central Region', value: '4' },
        { label: 'South Central Region', value: '5' },
        { label: 'South South Region', value: '6' },
    ];

    const options2 = [
        { label: 'A-Z', value: '0' },
        { label: 'Z-A', value: '1' },
    ]

    return (
        <View className='flex-row gap-2 items-center justify-between px-4 py-2 border-b border-gray-300'>
            {/* <Text className='flex-1 text-lg font-MontserratSemiBold'>Filter: </Text> */}
            <View>
                <CustomDropdown
                    options={options}
                    onSelect={(value) => console.log('Selected:', value)}
                    placeholder="Select Region"
                    dropdownStyle={{ backgroundColor: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' }}
                    textStyle={{ color: '#333' }}
                    selectedTextStyle={{ fontWeight: 'bold' }}
                    IconLeft={<PlaceTarget
                        width={20}
                        height={20}
                        style={{
                            opacity: 0.5
                        }}
                    />}
                    IconRight={<ChevronDown />}
                />
            </View>
            <View>
                <CustomDropdown
                    options={options2}
                    onSelect={(value) => console.log('Selected:', value)}
                    placeholder="A-Z"
                    dropdownStyle={{ backgroundColor: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' }}
                    textStyle={{ color: '#333' }}
                    selectedTextStyle={{ fontWeight: 'bold' }}
                    IconRight={<AlphabeticalSort
                        width={20}
                        height={20}
                    />}
                />
            </View>
        </View>
    )
}