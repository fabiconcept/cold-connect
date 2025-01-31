import { View } from 'react-native';
import CustomDropdown from './sub components/DropDown';
import PlaceTarget from '@/assets/svgs/storage/place-target';
import ChevronDown from '@/assets/svgs/storage/chevron-down';
import { useHubsByRegion } from '@/store/Public/Public Storage Feed Endpoints/hubsByRegion';

export default function FilterSection() {
    const { regions, load_hubs, selectedRegion, justSearch } = useHubsByRegion();

    if (justSearch) return null;

    return (
        <View className='flex-row gap-2 items-center justify-between px-4 py-2 border-b border-gray-300'>
            <View className='flex-1'>
                <CustomDropdown
                    options={regions}
                    onSelect={(value) => load_hubs(value)}
                    placeholder="Select Region"
                    defaultValue={selectedRegion}
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
        </View>
    )
}