import { View, Text, SectionList } from 'react-native';
import CartItem from './CartItem';
const dummyCartItems = [
    {
        title: "Avu/Obinze Hub",
        data: [1, 2, 3]
    },
    {
        title: "Buy Crates",
        data: [1, 2, 3]
    },
    {
        title: "Logistics",
        data: [1, 2, 3]
    },
];

export default function CartTray() {
    return (
        <SectionList
            sections={dummyCartItems}
            renderItem={({ item, index, section }) => (
                <CartItem
                    key={index}
                    isLast={index === section.data.length - 1}
                />
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerClassName='px-3 pb-10'
            renderSectionHeader={({ section }) => (
                <Text className='text-lg py-3 font-MontserratSemiBold mt-5'>{section.title}</Text>
            )}
        />
    )
}