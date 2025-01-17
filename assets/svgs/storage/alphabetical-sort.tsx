import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function AlphabeticalSort(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <Path fill="url(#pattern0_567_84)" d="M0 0H18V18H0z" />
            <Defs>
                <Pattern
                    id="pattern0_567_84"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_567_84" transform="scale(.02)" />
                </Pattern>
                <Image
                    id="image0_567_84"
                    width={50}
                    height={50}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+UlEQVR4nO2ZPUgcQRTHf2ITVDCJmCKiXHMkTeDATpSkskgleBYWFpIyGAUFLcV0URQJWFhETGkliEXaNOIHItiJCdhYCElEA2KCHyzMwmMY19Wb3cyE+cO/mOHde/xud2bfzkJQUFBQkCeqA1qVH1vMWxB5n5KDBoEr5RmLeRdE3nFy0IYoeAhU+whSFMVid/oI8t4A8tk3kCrgmwHkt9oAvAHpEIX+Aj/FuM8nkHlRaBWYE+MvvoA8AH6JQr1AmxhfAE0+gJS1NVGr5vfE/LAPICuiyCmwpfxDzO+6DtII/DHsViaXXAYZSAkRecplkHVRYBHo0TxpqWXJFKSg/ePPDDH1wJmIeekiSEkkP06I2xFxXS6CPAFGlYcS4vpFXNRYetHGZ6UActdbK62Lri/2q5R2crGX/heQArB0iw98ALlN3VofdgI8xzOQbg0iau9fVZDvn4CUDVeivcKcuYPYuBLR+/9X7aTyJpBmYA14gYMQp+r320BDAkgzsK/mjmzB2LqdJrRdbhN4ZABp0Y6fLoE3rkDE+mCAWRbjT8B3DeKtaxCxplI+YC/VW2rFD8QsIGJNp4AYzKJFOVcnjEl+fccaMwkgQzYg8uq1ojPlWUOeMVsQeYHEMB9FjhEsq0Z8Dkvrh/esFcFEJzLvLDMEBQUFBZGZrgG0dXcfT4cMyAAAAABJRU5ErkJggg=="
                />
            </Defs>
        </Svg>
    )
}

export default AlphabeticalSort