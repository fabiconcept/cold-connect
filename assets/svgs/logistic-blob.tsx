import { BlobProps } from '@/types/svg';
import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, G } from 'react-native-svg';

const LogisticBlob: React.FC<BlobProps> = ({ width = 430, height = 440, style, className = '' }: BlobProps) => {
    return (
        <Svg width={width} height={height} className={className} style={style} viewBox="0 0 430 440" fill="none">
            <G opacity={0.5} clipPath="url(#clip0_12_24)">
                <Path
                    d="M441.752 -155.807C490.508 -142.78 512.489 -80.0131 522.357 -23.4426C531.282 33.1036 527.171 82.5888 531.443 136.493C536.681 189.582 550.322 246.25 536.647 300.531C523.915 354.837 483.866 406.756 428.863 416.262C373.882 424.929 303.947 391.182 231.235 391.825C158.502 393.309 82.0267 429.998 27.5662 418.505C-26.8726 406.172 -60.2619 346.472 -97.4468 287.515C-135.575 228.533 -177.521 171.134 -184.45 110.437C-190.435 49.7638 -161.404 -14.2073 -112.159 -56.6429C-62.9146 -99.0786 7.48744 -119.954 69.8428 -121.706C133.142 -123.433 189.359 -106.851 254.783 -117.769C319.264 -128.712 393.917 -167.97 441.752 -155.807Z"
                    fill="url(#paint0_linear_12_24)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="paint0_linear_12_24"
                    x1="-193.546"
                    y1="414.467"
                    x2="399.311"
                    y2="-285.066"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#6496DF" />
                    <Stop offset={1} stopColor="#C5FAFF" />
                </LinearGradient>
                <ClipPath id="clip0_12_24">
                    <Rect
                        width={743.733}
                        height={598.631}
                        fill="white"
                        transform="translate(-185.514 -177.818) rotate(1.47963)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default LogisticBlob;