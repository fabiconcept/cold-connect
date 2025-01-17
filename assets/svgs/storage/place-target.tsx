import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";

function PlaceTarget(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <Path fill="url(#pattern0_562_205)" fillOpacity={1} d="M0 0H15V15H0z" />
            <Defs>
                <Pattern
                    id="pattern0_562_205"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_562_205" transform="scale(.02)" />
                </Pattern>
                <Image
                    id="image0_562_205"
                    width={50}
                    height={50}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD9klEQVR4nO2aWWiUVxTHf0ZBpAhqgxgL9UkU8UFweVBoirS27nEZcYeI+lKEltalVozVB0Vxw8St9a3Fh6m+RGPUCIpKXAtFuryk2igFraWtCjZNzJQLZ2A4nPvNN8PkfoPkDwfMN+fee/7fvfdsn9CL1x9DgBXAt8A14FcR9+9vgOXAYMoYVcBR4D8gk0eczmFgGGWGlcCLGAS0PAeWUSbYVQQBLTuTJrHRY9hLuRMNwJciDfLsX8+YDUmR+AB4ZRh0To7LLI+4y95sjHNzTQtNoh/wi2HIvggCWvYbL+InmTsYVhtv9KsCSGTla2OeVSGJXFOLu92ZrYx0f9cBaZGths4s2YXcua6EIjEU6FKL1ynjFgB3jbd9B5ivdLcpnS6gMgSRmWphFz9qlHFNEa72jNKtMWLQ9BBE1hgXVO9GRwSRDmNXflY6q0MQ2awWvaGM0kQtWaPG3FS/fx6CyLo8O7LIuEP6DqTy7MhHIYjUqEX/MbzR9QgiV5XuHOCZ0pkTKsvVxn1sRO92Q6/diPqfGnpVBIL2/WkjPiyUIHlD5Lg4Aq13Ws31IwGx3The84qI7PONY7UtJJGRQLcy4EARROrVHN0yd1CcV0b8bgTGKHG6j9UczSSAauOS1hdA5IgxvpqEoHflWZ5aJCtLjLvh6pjEMN64K+djEGkx7sYkEsZ3hlHrI0hsNMg79504Rkg3JNcw18ea67ngD5SuG/s2ZYJPjIt70iCS9mQFZYMKoNU4YptzSGwyavTbQF/KDOOMOuQJsFi81B/qtw4ZU5b4zJPtWtmw0y1bVAAXI1L4rFwW3UTxphwV1zk8BfRXvw+XI+Uj8UR0ctFfsuDDwFJZo0cwAKgFLgGdyjDXlNOY6qkSfd3EfUqvS9aqlbVLQsB5nj8j3nC3p+uha/uMeC6NGUaAzOTIU6nhiyY0xQhePnksH3hy0UfFjbQ8y8UQIwPOeMTZMrlQEguNI6S77Y3AF3JUNIksBkiH5HvgDY+O+3r1vuxgo8ztW7dTirFYGO1p/XdL481dxoEFvJS3ROJioGTQTZ4j52wbFWeiE8bgi5LphsYEI1POSC8gL26pQRcS9vkVYkOuTe64FpWWHwQGER6DgUPFpv3ves6m65TsAcb0vP2MBfYaVWT2xb4Td6IteVzhD0LqwwiPVQgqJZ7sBe7lWbvgvrDr4f4d08f/BpyV7+xbpZuekuLqPZF58myt6ByTOv1hzDX+krBQdPV3IuZ/Augp6ZBPdCWpIkfIUYob6Ush94HdsnbJ4VKMicAOSeqsy1isOGfSIu1YFz+Coq94mJR0Thrk01qrfENsAx6JtMmzVtGplzEpmSPx+qQXlBD/AyXnzKx1Z+BUAAAAAElFTkSuQmCC"
                />
            </Defs>
        </Svg>
    )
}

export default PlaceTarget