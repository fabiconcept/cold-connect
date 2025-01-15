import { BlobProps } from '@/types/svg';
import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, G } from 'react-native-svg';

const StorageBlob: React.FC<BlobProps> = ({ width = 430, height = 666, style, className = '' }: BlobProps) => {
    return (
        <Svg width={width} height={height} className={className} style={style} viewBox="0 0 430 666" fill="none">
            <G opacity={0.5} clipPath="url(#clip0_13_41)">
                <Path
                    d="M371.549 -162.601C421.994 -161.097 457.777 -105.04 480.35 -52.238C501.999 0.756744 509.341 49.8665 525.856 101.356C543.123 151.831 569.392 203.863 568.523 259.834C568.579 315.612 541.498 375.329 490.139 397.19C438.608 418.229 362.799 401.412 292.171 418.706C221.714 436.822 155.686 490.065 100.041 491.361C44.2246 491.836 -1.96055 441.379 -51.67 392.516C-102.303 343.845 -156.29 297.589 -176.948 240.097C-196.682 182.411 -183.088 113.489 -144.882 60.8948C-106.675 8.30081 -42.9333 -28.1573 17.3602 -44.1558C78.5776 -60.3468 137.099 -57.0932 198.279 -82.7176C258.534 -108.15 322.201 -163.475 371.549 -162.601Z"
                    fill="url(#paint0_linear_13_41)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="paint0_linear_13_41"
                    x1="-116.11"
                    y1="538.116"
                    x2="300.609"
                    y2="-278.69"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#6496DF" />
                    <Stop offset={1} stopColor="#C5FAFF" />
                </LinearGradient>
                <ClipPath id="clip0_13_41">
                    <Rect
                        width={943.778}
                        height={840.252}
                        fill="white"
                        transform="translate(-308 -157.453) rotate(-11.772)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default StorageBlob;