import CrateBlob from '@/assets/svgs/crate-blob';
import LogisticBlob from '@/assets/svgs/logistic-blob';
import StorageBlob from '@/assets/svgs/storage-blob';
import FullButton from '@/components/FullButton';
import OnboardingScreen from '@/components/Welcome/OnboardingScreen';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const screens = [
    {
        SVG: LogisticBlob,
        title: 'Welcome to Cold Connect',
        imageSource: require("@/assets/images/cold/truck.png"),
        subtitle: 'The app that connects you to those who can help you.'
    },
    {
        SVG: StorageBlob,
        title: 'Book Cold Storage',
        imageSource: require("@/assets/images/cold/storage.png"),
        subtitle: 'Book secure Cold Storage space for Your Perishables.'
    },
    {
        SVG: CrateBlob,
        title: 'Buy Crates',
        imageSource: require("@/assets/images/cold/crate.png"),
        subtitle: 'Purchase Crates in High and Low Quantities.'
    },
]

export default function welcome() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<Swiper>(null);

    const isLastSlide = activeIndex === screens.length - 1;

    return (
        <View className='h-full flex-1 flex pb-3'>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className='w-[8px] h-[8px] mx-1 bg-[#D9D9D9] rounded-full' />}
                activeDot={<View className='w-[32px] h-[8px] mx-1 bg-primary rounded-full' />}
                onIndexChanged={(index) => setActiveIndex(index)}
                className='pb-10'
            >
                {screens.map((item, index) => (
                    <OnboardingScreen
                        key={index}
                        SVG={item.SVG}
                        title={item.title}
                        imageSource={item.imageSource}
                        subtitle={item.subtitle}
                        classname={index === 2 ? 'top-48' : index === 1 ? 'top-80 scale-95' : 'top-72'}
                    />
                ))}
            </Swiper>
            <View style={styles.buttonContainer}>
                <FullButton
                    title={isLastSlide ? 'Get Started' : 'Continue'}
                    className='bg-primary py-4 rounded-2xl'
                    containerClassName='w-full'
                    textClassName='text-white text-md'
                    onPress={() => {
                        if (isLastSlide) {
                            router.replace('/(auth)/sign-in');
                        } else {
                            swiperRef.current?.scrollTo(activeIndex + 1);
                        }
                    }}
                />
                {isLastSlide && <FullButton
                    title='Skip'
                    textClassName='text-primary'
                    style={{
                        paddingBlock: 14,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        router.push('/(root)/enable-location');
                    }}
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 32,
        height: 4,
        marginHorizontal: 1,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
    },
    activeDot: {
        width: 32,
        height: 4,
        marginHorizontal: 1,
        backgroundColor: '#0286FF',
        borderRadius: 2,
    },
    buttonContainer: {
        padding: 12,
        gap: 3
    }
});