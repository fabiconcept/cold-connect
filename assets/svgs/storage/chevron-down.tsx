import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function ChevronDown(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <Path fill="url(#pattern0_567_83)" d="M0 0H18V18H0z" />
            <Defs>
                <Pattern
                    id="pattern0_567_83"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_567_83" transform="scale(.02)" />
                </Pattern>
                <Image
                    id="image0_567_83"
                    width={50}
                    height={50}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVR4nO3VQU7CQBTG8T8RPIOH0GAi8RTCioPISuJGl16AM+het3oAMIFwG3AxpMmYTEiwvJlh2sTvl7xNF+9N+/W1ICIiIiIiIvLvXAB3wADoFJzbAW6BoT9DkkdgCzhfc6DP6V0Di2BudYZpbLNR0MjtNX0CeuTXA573Hl5Y1Zth9nag2W8tM6dTpbCqmfka0/ijpmmudOpScEG9xwyYHNE4NZ1jUnBB3cfcyDnwZRhiSceSgvP16c8UpQs8ABvDwDVw80fPK+Db0O8HeEm5idBlhuGneChRUg7SaAqH9P1yW3bHsgvLQj/d6HRakUKu3Sm6CyXTaTSFXOm0IoWUdFqZgvXLVvSLlMsZMAZmvsb+moiIiIgIjdgBLzUhiVyqqPAAAAAASUVORK5CYII="
                />
            </Defs>
        </Svg>
    )
}

export default ChevronDown
