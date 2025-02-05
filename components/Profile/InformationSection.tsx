import { useAuthenticationStore } from '@/store/auth';
import { InformationItem, InformationActionItem, InformationItemEditable } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CautionAlert from '../general sub components/CautionAlert';

export default function InformationSection({
    data,
    title
}: {
    data: (InformationItem | InformationActionItem | InformationItemEditable)[],
    title: string
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <View className='mt-5'>
            <Text className='text-lg font-semibold font-MontserratSemiBold'>{title}</Text>
            <View className='bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 mt-2'>
                {data.map((item, index) => {
                    if (item.type === "text") {
                        return (
                            <View key={index} className={clsx(
                                'flex-row justify-between items-center px-5',
                                item.editable && "py-3",
                                !item.editable && "py-5",
                                index !== data.length - 1 && 'border-b border-gray-300'
                            )}>
                                <Text className='opacity-50'>{item.title}</Text>
                                <View className='flex-row gap-2 items-center justify-end flex-1'>
                                    {item.editable ? (
                                        <EditableItem item={item} />
                                    ) : (
                                        <View className='flex-1 items-end'>
                                            <Text numberOfLines={1} className='text-right'>{item.value}</Text>
                                        </View>
                                    )
                                    }
                                </View>
                            </View>
                        )
                    } else if (item.type === "action") {
                        return (
                            <TouchableOpacity hitSlop={10} onPress={item.warning ? () => setIsModalVisible(true) : item.action}>
                                <View key={index} className={clsx(
                                    'flex-row justify-between items-center p-5',
                                    index !== data.length - 1 && 'border-b border-gray-300'
                                )}>
                                    <View className='flex-1 flex-row gap-2 items-center'>
                                        <Feather name={item.Icon} size={18} color={item.themeColor} />
                                        <Text className='font-Montserrat font-semibold' style={{ color: item.themeColor }}>{item.title}</Text>
                                    </View>
                                </View>
                                {item.warning && <CautionAlert
                                    actionText={item.title}
                                    isModalVisible={isModalVisible}
                                    setIsModalVisible={setIsModalVisible}
                                    action={item.action}
                                    title={item.warningTitle}
                                    message={item.warningMessage}
                                />}
                            </TouchableOpacity>
                        )
                    }
                })}
            </View >
        </View >
    )
}

const EditableItem = ({ item }: { item: InformationItemEditable }) => {
    const [editableItem, setEditableItem] = useState<boolean>(false);
    const [value, setValue] = useState<string>(item.value.toLowerCase() === "n/a" ? "" : item.value);
    const inputRef = useRef<TextInput>(null);

    const { updatingUser, updateProfile, activeId } = useAuthenticationStore();

    useEffect(() => {
        if (editableItem && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editableItem]);

    const handleUpdate = async () => {
        setEditableItem(false);
        if (!value) return;

        await updateProfile({
            [item.name]: value.trim()
        }, activeId);
    }

    return (
        <>
            <View className='flex-1 items-end'>
                <TextInput
                    ref={inputRef}
                    className='h-10 py-0 -mb-1'
                    placeholder={item.placeHolder}
                    value={!editableItem ? item.value : value}
                    onBlur={handleUpdate}
                    onPointerLeave={handleUpdate}
                    editable={editableItem && !updatingUser}
                    onChangeText={setValue}
                />
            </View>
            {!updatingUser && !editableItem && <TouchableOpacity
                hitSlop={20}
                onPress={() => setEditableItem(true)}
            >
                <Feather name="edit-3" size={20} color="#0066e1" />
            </TouchableOpacity>}

            {!updatingUser && editableItem && <TouchableOpacity
                hitSlop={20}
                onPress={handleUpdate}
            >
                <Feather name="check" size={20} color="#0066e1" />
            </TouchableOpacity>}
            {updatingUser && <ActivityIndicator
                size={20}
                color="#0066e1"
            />}
        </>
    )
}