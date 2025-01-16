import * as React from "react"
import Svg, { G, Path, Defs, Pattern, Use, Image } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Snowflake(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={34}
            height={34}
            viewBox="2.25 0 26 28"
            fill="none"
            {...props}
        >
            <G opacity={1} filter="url(#filter0_d_160_20)">
                <Path
                    fill="url(#pattern0_160_20)"
                    // shapeRendering="crispEdges"
                    d="M4 0H30V26H4z"
                />
            </G>
            <Defs>
                <Pattern
                    id="pattern0_160_20"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_160_20" transform="scale(.01)" />
                </Pattern>
                <Image
                    id="image0_160_20"
                    width={120}
                    height={100}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default Snowflake;