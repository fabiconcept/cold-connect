import Flutter from '@/assets/svgs/Payment/flutter';
import Paystack from '@/assets/svgs/Payment/paystack';
import Header from '@/components/choose-payment-method/Header';
import PaymentOption from '@/components/choose-payment-method/PaymentOption';
import FullButton from '@/components/FullButton';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChoosePaymentMethod() {
    return (
        <SafeAreaView className='flex-1'>
            <Header />
            <View className="flex-1 px-3 gap-1 mt-3">
                <PaymentOption
                    label='Flutterwave'
                    SVG={<Flutter />}
                />
                <PaymentOption
                    label='Paystack'
                    SVG={<Paystack />}
                />
            </View>
            <FullButton
                title='Proceed to Payment'
                className='mt-auto mb-4 mx-4 bg-primary py-4 rounded-xl'
                textClassName='text-white text-lg font-semibold'
            />
        </SafeAreaView>
    )
}