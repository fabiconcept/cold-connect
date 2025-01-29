import { Feather } from '@expo/vector-icons';
import { View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { useAuthenticationStore } from '@/store/auth';

export default function ProfilePhotoContainer({ photo }: { photo: string }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { updateProfilePhoto, activeId } = useAuthenticationStore();

    const pickImage = async (): Promise<void> => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            if (Platform.OS === "ios") {
                Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            }
            return;
        }

        const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri: string = result.assets[0].uri;
            setSelectedImage(imageUri);

            const formData = await createFormDataFile(imageUri);

            await updateProfilePhoto(formData, activeId);
        }
    };

    const createFormDataFile = async (imageUri: string): Promise<FormData> => {
        const formData = new FormData();

        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        const fileType = fileInfo.uri.split('.').pop();
        const fileName = fileInfo.uri.split('/').pop();

        if (Platform.OS === 'web') {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            formData.append('photo', blob, fileName);
        } else {
            formData.append('photo', {
                uri: imageUri,
                name: fileName,
                type: `image/${fileType}`,
            } as any);
        }

        return formData;
    };

    return (
        <View className='mt-24 justify-center items-center'>
            <View className='w-[120px] h-[120px] rounded-full bg-gray-200 border-4 border-black/10 mx-auto overflow-hidden'>
                <Image
                    source={photo ? { uri: photo } : require("@/assets/images/cold/no-user.png")}
                    className='mx-auto h-full w-full'
                    resizeMode='cover'
                />
            </View>
            <TouchableOpacity
                className='absolute bottom-1 left-1/2 -translate-x-1/2 shadow-lg shadow-black bg-white w-[36px] h-[36px] rounded-full items-center justify-center'
                hitSlop={20}
                onPress={pickImage}
            >
                <Feather
                    name="camera"
                    size={20}
                    color="#0066e1"
                />
            </TouchableOpacity>
        </View>
    )
}