import CartTray from '@/components/Cart/CartTray';
import Header from '@/components/Cart/Header';
import ActionSheet from '@/components/general sub components/ActionSheet';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function cart() {
    return (

        <SafeAreaView className='flex-1'>
            <Image
                source={require("@/assets/images/cold/cart-ice-01.png")}

                resizeMode='contain'

                className='absolute top-0 right-0'
            />
            <Image
                source={require("@/assets/images/cold/cart-ice-02.png")}
                resizeMode='contain'
                className='absolute bottom-0 left-0'
            />
            <Header />
            <CartTray />
            <ActionSheet
                action={() => router.push("/(root)/choose-payment-method")}
                actionText="Pay Now"
                value={250700}
            />
        </SafeAreaView>
    )

}