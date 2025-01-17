import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function Target(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            {...props}
        >
            <Path fill="url(#pattern0_562_200)" d="M0 0H30V30H0z" />
            <Defs>
                <Pattern
                    id="pattern0_562_200"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_562_200" transform="scale(.01)" />
                </Pattern>
                <Image
                    id="image0_562_200"
                    width={100}
                    height={100}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default Target
