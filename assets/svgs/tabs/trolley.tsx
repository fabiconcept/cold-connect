import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";

function Trolley(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
            {...props}
        >
            <Path opacity={1} fill="url(#pattern0_160_31)" d="M0 0H26V26H0z" />
            <Defs>
                <Pattern
                    id="pattern0_160_31"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_160_31" transform="scale(.01)" />
                </Pattern>
                <Image
                    id="image0_160_31"
                    width={100}
                    height={100}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default Trolley;