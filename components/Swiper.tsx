import { SwiperProps } from '@/types/types';
import { FlatList, View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';

export default function Swiper<T>(props: SwiperProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width } = Dimensions.get('window');
    const dotAnimations = useRef<Animated.Value[]>([]);

    useEffect(() => {
        if (props.data && Array.isArray(props.data)) {
            dotAnimations.current = props.data.map(() => new Animated.Value(0));
        }
    }, [props.data]);

    useEffect(() => {
        if (dotAnimations.current.length > 0) {
            dotAnimations.current.forEach((anim, index) => {
                Animated.spring(anim, {
                    toValue: index === currentIndex ? 1 : 0,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 50
                }).start();
            });
        }
    }, [currentIndex]);

    return (
        <View>
            <FlatList
                data={props.data}
                renderItem={props.renderItem}
                keyExtractor={props.keyExtractor}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='pb-4'
                onScroll={e => {
                    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
            />
            <View style={styles.paginationContainer}>
                {props.data && Array.isArray(props.data) && props.data.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: currentIndex === index ? '#0066e1' : '#ccc',
                                width: dotAnimations.current[index]?.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [10, 24]
                                }) || 8
                            }
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 2,
        marginTop: -5
    },
    dot: {
        height: 10,
        borderRadius: 50,
    }
});