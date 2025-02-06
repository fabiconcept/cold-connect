import CartTray from '@/components/Cart/CartTray';
import Header from '@/components/Cart/Header';
import ActionSheet from '@/components/general sub components/ActionSheet';
import { useCrates } from '@/store/Crates';
import { useProducts } from '@/store/Products';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function cart() {
    const { products } = useProducts();
    const { addedToCart: crateAddedToCart, quantity: crateQuantity, rate: crateRate } = useCrates();

    const bill = useMemo(() => {
        const crateCount = crateAddedToCart ? crateQuantity : 0;
        const crateTotal = crateCount * crateRate;

        const productTotal = products
            .filter(p => p.addedToCart)
            .reduce((t, p) => t + ((p.quantity * p.rate) * p.storageLength), 0);

        return crateTotal + productTotal;
    }, [products, crateAddedToCart, crateQuantity, crateRate]);

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
                inCart={false}
                actionText={{
                    no: "",
                    yes: "Checkout"
                }}
                value={bill}
            />
        </SafeAreaView>
    )

}