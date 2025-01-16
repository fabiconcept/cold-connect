import React from 'react';
import Svg, {
    Path,
    Defs,
    LinearGradient,
    Stop
} from 'react-native-svg';

const GradientOverlay = ({ width = 427, height = 669 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 427 669" fill="none">
            <Path d="M-3 0H427V669H-3V0Z" fill="url(#paint0_linear_95_16)" />
            <Defs>
                <LinearGradient
                    id="paint0_linear_95_16"
                    x1="215"
                    y1="27"
                    x2="215"
                    y2="696"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="white" stopOpacity="0" />
                    <Stop offset="0.379397" stopColor="white" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export default GradientOverlay;