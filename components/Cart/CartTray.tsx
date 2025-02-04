import { Text, SectionList, View } from 'react-native';
import CartItem from './CartItem';
import { CartItems } from '@/constants/CartItems';
import { useProducts } from '@/store/Products';

// Define types for better type safety
interface CartItemData {
    title: string;
    rate: number;
    quantity: number;
}

interface CartSection {
    title: string;
    data: CartItemData[];
}

export default function CartTray() {
    const { products, selectedHub } = useProducts();

    // Filter out falsy sections and create typed cart data
    const cartData: CartSection[] = [
        {
            title: selectedHub,
            data: products
        },
    ].filter(section => section.data.length > 0);

    const findCartItemImage = (title: string) =>
        CartItems.find(c => c.title.toLowerCase() === title.toLowerCase())?.image;

    const renderItem = ({ item, index, section }: {
        item: CartItemData;
        index: number;
        section: CartSection
    }) => (
        <CartItem
            {...item}
            image={findCartItemImage(item.title)}
            price={item.rate}
            isLast={index === section.data.length - 1}
        />
    );

    const renderSectionHeader = ({ section: { title } }: { section: CartSection }) => (
        <Text className='text-lg py-3 font-MontserratSemiBold mt-5'>{title}</Text>
    );

    const renderFooter = () => <View className='h-36' />;

    return (
        <SectionList
            sections={cartData}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerClassName='px-3'
            ListFooterComponent={renderFooter}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
        />
    );
}