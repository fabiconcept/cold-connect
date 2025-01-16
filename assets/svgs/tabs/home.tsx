import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function Home(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
            {...props}
        >
            <Path fill="url(#pattern0_160_18)" d="M0 0H26V26H0z" />
            <Defs>
                <Pattern
                    id="pattern0_160_18"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_160_18" transform="scale(.01)" />
                </Pattern>
                <Image
                    id="image0_160_18"
                    width={100}
                    height={100}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default Home