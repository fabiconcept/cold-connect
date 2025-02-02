import { ImageSourcePropType } from "react-native";

export const ProductPageItem: {
    title: string,
    imageSource: ImageSourcePropType,
    backgroundImage: ImageSourcePropType,
    description: string,
    price: number,
    measurement: "crate" | "tray"
}[] = [
        {
            title: ('Fruits').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/fruits-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/fruits-blur.png'),
            description: "Keep your fruits fresh with Cold Connect's specialized cold storage. Our crates, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your fruits are in expert hands.",
            price: 200,
            measurement: "crate"
        },
        {
            title: ('Vegetable').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/veg-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/veg-blur.png'),
            description: "Keep your vegetables fresh with Cold Connect's specialized cold storage. Our trays, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your vegetables are in expert hands.",
            price: 200,
            measurement: "tray"
        },
        {
            title: ('Meat').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/meat-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/meat-blur.png'),
            description: "Keep your meat fresh with Cold Connect's specialized cold storage. Our trays, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your meat is in expert hands.",
            price: 200,
            measurement: "tray"
        },
        {
            title: ('Beverage').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/bev-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/bev-blur.png'),
            description: "Keep your beverages fresh with Cold Connect's specialized cold storage. Our trays, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your beverages are in expert hands.",
            price: 200,
            measurement: "tray"
        },
        {
            title: ('Dairy').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/dairy-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/dairy-blur.png'),
            description: "Keep your dairy fresh with Cold Connect's specialized cold storage. Our crates, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your dairy is in expert hands.",
            price: 200,
            measurement: "crate"
        },
        {
            title: ('Fish').toLowerCase(),
            imageSource: require('@/assets/images/cold/products/fish-image.png'),
            backgroundImage: require('@/assets/images/cold/product-back/fish-blur.png'),
            description: "Keep your fish fresh with Cold Connect's specialized cold storage. Our crates, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your fish is in expert hands.",
            price: 200,
            measurement: "crate"
        }
    ]