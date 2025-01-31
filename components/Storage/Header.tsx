import { View, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import InputField from '../Form/InputField';
import Target from '@/assets/svgs/storage/target';
import { useHubsByRegion } from '@/store/Public/Public Storage Feed Endpoints/hubsByRegion';
import { getGeoRegionInNigeria } from '@/lib/utilities';
import { useLocationStore } from '@/store';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/Hooks/useDebounce';


export default function Header() {
    const { setSelectedRegion, load_hubs, search_for_hubs, reset_search, selectedRegion } = useHubsByRegion();
    const { latitude, longitude } = useLocationStore();
    const [searchQuery, setSearchQuery] = useState("");

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            search_for_hubs(debouncedSearchQuery);
        } else {
            reset_search();
            load_hubs(selectedRegion!);
        }
    }, [debouncedSearchQuery]);

    const loadHubsAroundMe = async () => {
        const region = getGeoRegionInNigeria(latitude!, longitude!);
        const userRegion = region === "unknown" ? "" : region;

        if (Platform.OS === 'android') {
            ToastAndroid.show("Load Hubs Around Me", ToastAndroid.SHORT);
        }

        setSelectedRegion(userRegion);
        load_hubs(userRegion);
    }

    return (
        <View className='h-[117px] bg-primary flex-row items-end p-5 gap-3'>
            <View className='flex-1'>
                <InputField
                    label=''
                    secureTextEntry={false}
                    keyboardType='default'
                    placeholder='Find a Cold Storage'
                    containerStyle='rounded-full px-2'
                    iconStyle='opacity-60'
                    fullyRounded={true}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    onPress={loadHubsAroundMe}
                    className='bg-white h-[50px] w-[50px] items-center justify-center rounded-full absolute top-[35%] right-0 -translate-y-1/2'
                >
                    <Target
                        width={24}
                        height={24}
                    />
                    <View className='absolute top-0 left-0 w-full h-full items-center justify-center opacity-20'>
                        <Target
                            width={'100%'}
                            height={"100%"}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}