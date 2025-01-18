import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { View, Text, Dimensions, Pressable } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { useState } from 'react';

export default function ColorPicker() {
    const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});

    const handleCheck = (name: string) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    const colors = [
        { name: 'Blue Color', value: '#3B82F6' },
        { name: 'Green Color', value: '#16A34A' },
        { name: 'Red Color', value: '#EF4444' },
    ]

    return (
        <View className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow' style={{
            width: (Dimensions.get("window").width / 2) - 18
        }}>
            <Text className='py-4 text-center text-gray-400 text-sm'>Crate Colors</Text>
            <View className='gap-1'>
                {colors.map((color, index) => (
                    <Pressable
                        onPress={() => checkedState["Mixed"] ? null : handleCheck(color.name)}
                        key={index}
                        className={clsx(
                            'flex-row items-center justify-between px-3',
                            checkedState["Mixed"] && 'opacity-20'
                        )}
                        style={{
                            width: (Dimensions.get("window").width / 2) - 18
                        }}
                    >
                        <Feather
                            name={checkedState[color.name] ? 'check-circle' : 'circle'}
                            size={14}
                            color="black"
                        />
                        <Text className='flex-1 ml-2' style={{ color: color.value }}>{color.name}</Text>
                        <Checkbox
                            label=""
                            checked={checkedState["Mixed"] ? checkedState["Mixed"] : checkedState[color.name]}
                            onPress={() => checkedState["Mixed"] ? null : handleCheck(color.name)}
                            checkedColor={color.value}
                        />
                    </Pressable>
                ))}
                <Pressable
                    onPress={() => handleCheck("Mixed")}
                    hitSlop={5}
                    className={clsx(
                        'flex-row items-center justify-between px-3',
                        !checkedState["Mixed"] && 'opacity-60'
                    )}
                    style={{
                        width: (Dimensions.get("window").width / 2) - 18
                    }}
                >
                    <Feather
                        name={checkedState["Mixed"] ? 'check-circle' : 'circle'}
                        size={14}
                        color="black"
                    />
                    <Text className='flex-1 ml-2'>Mixed</Text>
                    <Checkbox
                        label=""
                        checked={checkedState["Mixed"]}
                        onPress={() => { }}
                        checkedColor={'#0066e1'}
                    />
                </Pressable>
            </View>
        </View>
    )
}