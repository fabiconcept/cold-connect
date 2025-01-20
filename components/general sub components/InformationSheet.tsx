import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const INITIAL_HEIGHT = height * 0.75;
const EXPANDED_HEIGHT = height * 0.9;
const SNAP_POINTS = [INITIAL_HEIGHT, EXPANDED_HEIGHT];

const SPRING_CONFIG = {
    damping: 10,
    mass: 0.8,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
};

const GESTURE_THRESHOLD = 10; // Minimum vertical movement before activating gesture

const ExpandableCard = ({
    children,
    className,
    showHandle = true
}: {
    children: React.ReactNode,
    className?: string,
    showHandle?: boolean
}) => {
    const cardHeight = useSharedValue(INITIAL_HEIGHT);
    const translateY = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const isExpanded = useSharedValue(false);
    const gestureActive = useSharedValue(false);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event, ctx: any) => {
            ctx.startY = translateY.value;
            ctx.startHeight = cardHeight.value;
            ctx.startX = event.x;
            ctx.startTranslationY = event.translationY;
            gestureActive.value = false;
        },
        onActive: (event, ctx: any) => {
            // Check if this is primarily a vertical gesture
            const verticalMovement = Math.abs(event.translationY);
            const horizontalMovement = Math.abs(event.translationX);

            // Only activate vertical gesture if movement is primarily vertical
            if (!gestureActive.value) {
                if (verticalMovement > GESTURE_THRESHOLD && verticalMovement > horizontalMovement) {
                    gestureActive.value = true;
                }
            }

            if (gestureActive.value) {
                isDragging.value = true;
                const newTranslateY = ctx.startY + event.translationY;

                // Restrict pull direction based on current state
                if (isExpanded.value) {
                    // When expanded, only allow pulling down
                    translateY.value = Math.min(35, Math.max(0, newTranslateY));
                } else {
                    // When collapsed, only allow pulling up
                    translateY.value = Math.max(-35, Math.min(0, newTranslateY));
                }

                // Calculate new height based on pull level with smoother interpolation
                const pullDelta = -translateY.value;
                const progress = pullDelta / 50;
                const heightDelta = (EXPANDED_HEIGHT - INITIAL_HEIGHT) * progress;
                cardHeight.value = ctx.startHeight + heightDelta;
            }
        },
        onEnd: () => {
            if (gestureActive.value) {
                isDragging.value = false;
                const currentHeight = cardHeight.value;
                const nearestSnapPoint = SNAP_POINTS.reduce((prev, curr) =>
                    Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev
                );

                isExpanded.value = nearestSnapPoint === EXPANDED_HEIGHT;

                // Bouncier animations on release
                cardHeight.value = withSpring(nearestSnapPoint, {
                    ...SPRING_CONFIG,
                    velocity: 2
                });
                translateY.value = withSpring(0, {
                    ...SPRING_CONFIG,
                    velocity: 1.5
                });
            }
            gestureActive.value = false;
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: isDragging.value ? cardHeight.value : withSpring(cardHeight.value, SPRING_CONFIG),
            transform: [{ translateY: translateY.value }]
        };
    });

    return (
        <PanGestureHandler 
            onGestureEvent={gestureHandler}
            activeOffsetY={[-10, 10]} // Only activate for vertical movements > 10 units
            failOffsetX={[-10, 10]} // Fail gesture if horizontal movement > 10 units before vertical threshold
        >
            <Animated.View
                style={[animatedStyle]}
                className={`w-full bg-white rounded-t-[40px] px-3 pt-12 pb-5 absolute bottom-0 shadow-lg shadow-black/10 ${className}`}
            >
                {showHandle && <View hitSlop={20} className='absolute top-0 left-0 w-screen h-8 gap-1 rounded-t-[40px] mx-1 bg-gray-100 justify-center items-center'>
                    <View className='w-16 h-[2px] bg-gray-400 rounded-full'></View>
                </View>}
                {children}
            </Animated.View>
        </PanGestureHandler>
    );
};

export default ExpandableCard;