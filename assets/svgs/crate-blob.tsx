import { BlobProps } from '@/types/svg';
import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, G } from 'react-native-svg';

const CrateBlob: React.FC<BlobProps> = ({ width = 430, height = 685, style, className = '' }: BlobProps) => {
    return (
        <Svg width={width} height={height} className={className} style={style} viewBox="0 0 430 685" fill="none">
            <G opacity={0.5} clipPath="url(#clip0_16_60)">
                <Path
                    d="M321.963 -210.816C372.055 -216.954 415.901 -166.95 446.196 -118.166C475.606 -69.0527 490.287 -21.617 514.395 26.7849C539.094 74.0696 572.925 121.533 580.527 176.992C589.013 232.121 571.269 295.245 523.805 324.619C476.046 353.205 398.566 348.04 331.364 375.81C264.455 404.369 207.233 466.98 152.423 476.673C97.32 485.578 44.0388 442.683 -12.4854 401.894C-69.8938 361.436 -130.251 323.872 -159.362 270.162C-187.589 216.123 -184.569 145.937 -154.752 88.1728C-124.934 30.408 -67.4354 -15.2661 -10.2529 -40.1943C47.8139 -65.4525 106.155 -71.082 162.758 -105.66C218.477 -139.907 273.05 -204.22 321.963 -210.816Z"
                    fill="url(#paint0_linear_16_60)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="paint0_linear_16_60"
                    x1="-54.1765"
                    y1="555.562"
                    x2="234.29"
                    y2="-314.847"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#6496DF" />
                    <Stop offset={1} stopColor="#C5FAFF" />
                </LinearGradient>
                <ClipPath id="clip0_16_60">
                    <Rect
                        width={943.778}
                        height={840.252}
                        fill="white"
                        transform="translate(-349 -103.01) rotate(-20.4658)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default CrateBlob;