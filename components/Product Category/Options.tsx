import { View, Text } from 'react-native';
import Counter from '../general sub components/Counter';
import { useProducts } from '@/store/Products';

export default function Options({
    selectedCategory,
    rate,
}: {
    selectedCategory: string,
    rate: number,
}) {
    const { products, addProduct, updateProduct } = useProducts();

    const productInfoExists = products.find(product => product.title === selectedCategory);

    const onNumberOfCratesChange = (value: number) => {
        if (productInfoExists) {
            updateProduct({ ...productInfoExists, quantity: value })
        } else {
            addProduct({
                title: selectedCategory as "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables",
                quantity: value,
                rate: rate,
                storageLength: 1
            })
        }
    }

    const onNumberOfDaysChange = (value: number) => {
        if (productInfoExists) {
            updateProduct({ ...productInfoExists, storageLength: value })
        } else {
            addProduct({
                title: selectedCategory as "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables",
                quantity: 1,
                rate: rate,
                storageLength: value
            })
        }
    }

    return (
        <View className='flex-wrap gap-2 flex-row justify-center pb-8 border-b border-gray-200'>
            <Counter sizeVariant='large' title='Number of Crates' defaultValue={productInfoExists ? productInfoExists.quantity : 1} onValueChange={onNumberOfCratesChange} />
            <Counter sizeVariant='large' title='Number of Days' defaultValue={productInfoExists ? productInfoExists.storageLength : 1} onValueChange={onNumberOfDaysChange} />
        </View>
    )
}