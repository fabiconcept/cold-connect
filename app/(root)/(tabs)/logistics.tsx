import TruckSmall from '@/assets/svgs/logistics/truck-small';
import Header from '@/components/Logistics/Header';
import Options from '@/components/Logistics/Options';
import { Image } from 'react-native';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Logistics() {
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
                <View className='h-32'></View>
            </ScrollView>
        </SafeAreaView >
    )
}