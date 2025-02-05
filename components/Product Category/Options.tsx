import { View } from 'react-native';
import Counter from '../general sub components/Counter';
import { useProducts } from '@/store/Products';
import { useMemo } from 'react';


export default function Options({
    selectedCategory,
    rate,
}: {
    selectedCategory: string,
    rate: number,
}) {
    const { products, addProduct, updateProduct } = useProducts();

    const productInfoExists = useMemo(() => {
        return products.find(product => product.title.includes(selectedCategory.toLowerCase()))
    }, [products, selectedCategory]);

    const defaultValues = useMemo(() => {
        if (!productInfoExists) return {
            quantity: 1,
            storageLength: 1
        }
        return {
            quantity: productInfoExists.quantity,
            storageLength: productInfoExists.storageLength
        }
    }, [productInfoExists]);

    const onNumberOfCratesChange = (value: number) => {
        if (productInfoExists) {
            updateProduct({ ...productInfoExists, quantity: value })
        } else {
            addProduct({
                title: selectedCategory as "fish" | "beverage" | "dairy" | "fruits" | "meat" | "vegetables",
                quantity: value,
                rate: rate,
                storageLength: 1,
                type: "storage" as const
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
                storageLength: value,
                type: "storage" as const
            })
        }
    }

    return (
        <View className='flex-wrap gap-2 flex-row justify-center pb-8 border-b border-gray-200'>
            <Counter
                sizeVariant='large'
                title={`Number of Crates`}
                defaultValue={defaultValues.quantity}
                onValueChange={onNumberOfCratesChange}
            />
            <Counter
                sizeVariant='large'
                title={`Number of Days`}
                defaultValue={defaultValues.storageLength}
                onValueChange={onNumberOfDaysChange}
            />
        </View>
    )
}