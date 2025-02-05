
import { useCrates } from '@/store/Crates';
import { useEffect, useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

interface ColorState {
    selectedColor: string;
}

export default function CrateColorPicker() {
    const { selectedColor, setSelectedColor } = useCrates();
    const [colorState, setColorState] = useState<ColorState>({
        selectedColor: selectedColor || '#3B82F6'
    });

    const handleColorChange = (color: string) => {
        setColorState(prev => ({
            ...prev,
            selectedColor: color
        }));
    };

    useEffect(() => {
        if (colorState.selectedColor === selectedColor) return;
        setSelectedColor(colorState.selectedColor);
    }, [colorState.selectedColor]);

    return (
        <View className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow' style={{
            width: (Dimensions.get("window").width / 2) - 18
        }}>
            <Text className='pt-4 text-center opacity-80 text-sm' style={{ color: colorState.selectedColor }}>{colorState.selectedColor ?? 'Crate Colors'}</Text>
            <View className='px-3'>
                <View className="h-36" style={{ flex: 1 }}>
                    <ColorPicker
                        defaultColor={colorState.selectedColor}
                        onColorSelected={handleColorChange}
                        style={{
                            flex: 1
                        }}
                        hideSliders={true}
                    />
                </View>
            </View>
        </View>
    );
}