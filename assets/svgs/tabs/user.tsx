import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function User(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={26}
            height={27}
            viewBox="0 0 26 27"
            fill="none"
            {...props}
        >
            <Path opacity={1} fill="url(#pattern0_160_28)" d="M0 0H26V27H0z" />
            <Defs>
                <Pattern
                    id="pattern0_160_28"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_160_28" transform="scale(.01 .00963)" />
                </Pattern>
                <Image
                    id="image0_160_28"
                    width={100}
                    height={100}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default User
