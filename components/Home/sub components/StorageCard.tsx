import { View, Text, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function StorageCard() {
    return (
        <View className='bg-white rounded-3xl h-[180px] overflow-hidden relative mr-3 last:mr-1' style={{ width: width - 24 }}>
            <Image
                source={require("@/assets/images/cold/storage-pic.png")}
                className='w-full h-full'
            />
            <View className='absolute bottom-0 left-0 right-0 p-4 bg-white flex-row items-center justify-between' style={{ width: width - 18 }}>
                <View className=''>
                    <Text className='text-lg font-semibold leading-5'>
                        {"Avu/Obinze Hub "}
                        <FontAwesome
                            name="star"
                            size={14}
                            color={"#FFC107"}
                        />
                        <FontAwesome
                            name="star"
                            size={14}
                            color={"#FFC107"}
                        />
                        <FontAwesome
                            name="star"
                            size={14}
                            color={"#FFC107"}
                        />
                        <FontAwesome
                            name="star"
                            size={14}
                            color={"#FFC107"}
                        />
                        <FontAwesome
                            name="star-o"
                            size={14}
                            color={"#FFC107"}
                        />
                    </Text>
                    <Text className='text-sm mb-2 opacity-50'>
                        Carrot Market, Avu, Owerri, Imo State
                    </Text>
                </View>
                <Text className='text-base font-semibold text-[#04B90B] -mt-2 mr-2'>
                    Active
                </Text>
            </View>
            <View className='absolute top-5 left-3 px-4 py-1 bg-primary rounded-3xl'>
                <Text className='text-white text-base font-semibold'>
                    00 KM
                </Text>
            </View>
        </View>
    )
}