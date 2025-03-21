import TruckSmall from '@/assets/svgs/logistics/truck-small';
import FullButton from '@/components/FullButton';
import Header from '@/components/Logistics/Header';
import Options from '@/components/Logistics/Options';
import { useLogisticsStore } from '@/store/Logistics';
import clsx from 'clsx';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Logistics() {
    const { logisticsFilled } = useLogisticsStore();
    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle={"dark-content"} />
            <Header />
            <ScrollView>
                <View className='mb-8 mt-10 justify-center items-center w-full'>
                    <Image
                        source={require("@/assets/images/cold/ellipse-24.png")}
                        resizeMode='contain'
                        className='absolute top-0 left-0 w-full opacity-50'
                    />
                    <TruckSmall
                        width={'90%'}
                        style={{
                            marginLeft: 16
                        }}
                    />
                </View>
                <Options />
                <View className={clsx(logisticsFilled() ? 'h-36' : "h-10")}></View>
            </ScrollView>
            {logisticsFilled() && <View className='absolute bottom-0 px-3 py-7 bg-white w-full border-t shadow-2xl shadow-black border-gray-200'>
                <FullButton
                    title='Get Quote'
                    containerClassName='flex-1'
                    className='bg-primary w-full rounded-full py-5'
                    textClassName='text-white text-lg font-semibold'
                    onPress={() => router.push(`/(root)/map?type=logistics`)}
                />
            </View>}
        </SafeAreaView >
    )
}