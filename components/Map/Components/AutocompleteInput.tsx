import InputField from '@/components/Form/InputField';
import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { GeoAPI } from '@/lib/Map Utilities/GeoAPI';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/Hooks/useDebounce';
import clsx from 'clsx';
import { Location } from '@/types/types';

export default function AutocompleteInput({
    value,
    selectedValue,
    onChangeText,
    setSelectedValue
}: {
    value: string,
    selectedValue?: Location,
    onChangeText: (text: string) => void,
    setSelectedValue: (value: Location) => void
}) {
    const geoApi = new GeoAPI();
    const debouncedValue = useDebounce(value, 500);
    const [suggestions, setSuggestions] = useState<{
        location: Location
        id: string
    }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(debouncedValue === '' || debouncedValue === selectedValue?.address) return;
        try {
            setLoading(true);
            setError(false);

            const fetchSuggestions = async () => {
                const res = await geoApi.getAutocomplete(debouncedValue);
                setSuggestions(res.features.splice(0, 4).map((feature) => ({
                    location: {
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        address: feature.properties.formatted,
                    },
                    id: feature.properties.id
                })));
            }
            
            fetchSuggestions();
        } catch (error) {
            console.log({ error });
            setError(true);
        }finally{
            setLoading(false);
        }
    }, [debouncedValue]);

    useEffect(() => {
        setSuggestions([]);
    }, [value]);
    return (
        <View className='relative'>
            <InputField
                label='From'
                placeholder='Enter your destination'
                containerStyle='mt-2'
                value={value}
                onChangeText={onChangeText}
            />
            {!!(suggestions.length > 0) && <View className='absolute top-full left-0 right-0'>
                <FlatList
                    className='bg-white flex-1 rounded-md mt-1 shadow-md border border-gray-200'
                    data={suggestions}
                    nestedScrollEnabled
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            className={clsx(
                                'flex flex-row items-center py-4 px-5 border-b border-gray-200 last:rounded-b-md',
                                loading && 'opacity-50 animate-ping',
                                error && 'text-red-500 border-red-500'
                            )}
                            disabled={loading}
                            onPress={() => {
                                onChangeText(item.location.address);
                                setSelectedValue(item.location);
                                setSuggestions([]);
                            }}
                        >
                            <Text>{item.location.address}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>}
        </View>
    )
}