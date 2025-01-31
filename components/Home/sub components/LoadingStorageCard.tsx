import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function LoadingStorageCard() {
    const shimmerTranslate = useSharedValue(-width);

    // Run shimmer animation loop
    useEffect(() => {
        shimmerTranslate.value = withRepeat(
            withTiming(width, { duration: 1200 }),
            -1,
            true
        );
    }, []);

    // Shimmer effect animation
    const animatedShimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shimmerTranslate.value }],
        opacity: interpolate(shimmerTranslate.value, [-width, width], [0.3, 1]),
    }));

    return (
        <View className="bg-gray-100 rounded-3xl h-[200px] shadow-md w-[100%] mx-auto border border-black/20 overflow-hidden">
            <Animated.View style={[animatedShimmerStyle, { width: "100%", height: "100%", backgroundColor: "#e0e0e0" }]} className="flex-1"></Animated.View>
            {/* Status and Distance */}
            <View className="flex-row justify-between gap-8 items-center px-4 py-7 border-t border-t-black/10">
                <View className="flex-1">
                    <View className="h-4 bg-gray-400 rounded-full w-[60%] mb-2 overflow-hidden relative">
                        <Animated.View style={[animatedShimmerStyle, { width: "100%", height: "100%", backgroundColor: "#e0e0e0" }]} />
                    </View>
                    <View className="h-3 bg-gray-400 rounded-full w-[90%] overflow-hidden relative">
                        <Animated.View style={[animatedShimmerStyle, { width: "100%", height: "100%", backgroundColor: "#e0e0e0" }]} />
                    </View>
                </View>

                <View className="h-3 bg-green-500 rounded-full w-1/5 overflow-hidden relative">
                    <Animated.View style={[animatedShimmerStyle, { width: "100%", height: "100%", backgroundColor: "#e0e0e0" }]} />
                </View>
            </View>
        </View>
    );
}
