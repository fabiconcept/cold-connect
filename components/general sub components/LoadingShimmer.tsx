import React, { useEffect } from "react";
import { View, Dimensions, ViewStyle, DimensionValue } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const LoadingShimmer = ({
    compHeight,
    compWidth,
    borderRadius,
    style,
    shimmerWidth,
    shimmerDuration,
}: {
    compHeight: DimensionValue;
    compWidth: DimensionValue;
    borderRadius: number;
    style: ViewStyle;
    shimmerWidth?: number;
    shimmerDuration: number;
}) => {
    const shimmerTranslate = useSharedValue(-width);

    // Run shimmer animation loop
    useEffect(() => {
        shimmerTranslate.value = withRepeat(
            withTiming(width, { duration: shimmerDuration || 1200 }),
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
        <View
            style={[{ height: compHeight, width: compWidth, borderRadius, overflow: "hidden" }, style]}>
            <Animated.View
                style={[animatedShimmerStyle, { width: shimmerWidth || "100%", height: "100%", backgroundColor: "#e0e0e0" }]} />
        </View>
    );
};

export default LoadingShimmer;