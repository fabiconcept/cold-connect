import * as Animatable from 'react-native-animatable';
import { View, useWindowDimensions } from 'react-native';
import { useCallback, useRef, useState } from 'react';

interface AnimatedItemProps {
    delay?: number;
    children: React.ReactNode;
    threshold?: number;
}

const RevealComponent = ({
    delay = 0,
    children,
    threshold = 0.25
}: AnimatedItemProps) => {
    const { height: WINDOW_HEIGHT } = useWindowDimensions();
    const [isVisible, setIsVisible] = useState(false);
    const viewRef = useRef<Animatable.View & View>(null);

    const handleLayout = useCallback((event: any) => {
        const { layout } = event.nativeEvent;
        const elementY = layout.y;

        // Calculate visibility threshold
        const visibleThreshold = WINDOW_HEIGHT * (1 - threshold);
        const shouldBeVisible = elementY < visibleThreshold;

        if (shouldBeVisible && !isVisible) {
            setIsVisible(true);
        }
    }, [WINDOW_HEIGHT, threshold, isVisible]);

    return (
        <View onLayout={handleLayout}>
            <Animatable.View
                ref={viewRef}
                animation={isVisible ? "fadeIn" : undefined}
                delay={isVisible ? delay : undefined}
                duration={500}
                useNativeDriver
            >
                {children}
            </Animatable.View>
        </View>
    );
};

export default RevealComponent;