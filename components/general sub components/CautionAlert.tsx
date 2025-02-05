import { View, Text, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import FullButton from '../FullButton';

export default function CautionAlert({
    isModalVisible,
    setIsModalVisible,
    action,
    title,
    message,
    actionText
}: {
    isModalVisible: boolean,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    action: () => void,
    title: string,
    message: string,
    actionText: string
}) {
    return (
        <ReactNativeModal
            isVisible={isModalVisible}
            animationIn="wobble"
            animationOut="fadeOutDown"
            backdropOpacity={0.5}
            onBackdropPress={() => setIsModalVisible(false)}
        >
            <View className="min-h-[300px] bg-white px-7 py-9 rounded-2xl items-center">
                <View className='h-28 w-28 rounded-full border border-gray-200 bg-yellow-100/50 p-4'>
                    <Image
                        source={require("@/assets/images/cold/alert.png")}
                        resizeMode='contain'
                        className='w-full h-full'
                    />
                </View>
                <Text className='text-xl font-bold mt-3'>{title}</Text>
                <Text className='text-center mt-1 mb-5'>
                    {message}
                </Text>
                <View className='w-full flex-row gap-2'>
                    <FullButton
                        title={actionText}
                        className='bg-red-500 py-4 rounded-full'
                        containerClassName='flex-1'
                        textClassName='text-white text-md'
                        onPress={action}
                    />
                    <FullButton
                        title={"Cancel"}
                        className='border border-primary py-4 rounded-full'
                        containerClassName='flex-1'
                        textClassName='text-primary text-md'
                        onPress={async () => {
                            setIsModalVisible(false)
                        }}
                    />
                </View>
            </View>
        </ReactNativeModal>
    )
}