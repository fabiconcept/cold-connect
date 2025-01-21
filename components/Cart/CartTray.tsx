import { Text, SectionList } from 'react-native';
import CartItem from './CartItem';
const dummyCartItems = [
    {
        title: "Avu/Obinze Hub",
        data: [
            {
                title: "Fish",
                price: 200,
                quantity: 12,
                image: require("@/assets/images/cold/fish-cart-tem.png")
            },
            {
                title: "Beverages",
                price: 16700,
                quantity: 12,
                image: require("@/assets/images/cold/bev-cart-tem.png")
            },
            {
                title: "Milk & Dairy",
                price: 200,
                quantity: 12,
                image: require("@/assets/images/cold/milk-cart-tem.png")
            },
            {
                title: "Fish",
                price: 200,
                quantity: 12,
                image: require("@/assets/images/cold/fish-cart-tem.png")
            },
            {
                title: "Vegetables",
                price: 200,
                quantity: 12,
                image: require("@/assets/images/cold/veg-cart-tem.png")
            },
            {
                title: "Meat",
                price: 200,
                quantity: 12,
                image: require("@/assets/images/cold/meat-cart-tem.png")
            }
        ]
    },
    {
        title: "Buy Crates",
        data: [
            {
                title: "Crates",
                price: 200,
                quantity: 5,
                image: require("@/assets/images/cold/crate-cart-tem.png")
            }
        ]
    },
    {
        title: "Logistics",
        data: [
            {
                title: "Logistics",
                price: 187200,
                quantity: 1,
                image: require("@/assets/images/cold/logistics-cart-tem.png")
            }
        ]
    }
];

export default function CartTray() {
    return (
        <SectionList
            sections={dummyCartItems}
            renderItem={({ item, index, section }) => (
                <CartItem
                    key={index}
                    {...item}
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