import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function Truck(props: React.ComponentProps<typeof Svg>) {
    return (
        <Svg
            width={26}
            height={28}
            viewBox="0 0 26 28"
            fill="none"
            {...props}
        >
            <Path opacity={1} fill="url(#pattern0_160_23)" d="M0 0H26V28H0z" />
            <Defs>
                <Pattern
                    id="pattern0_160_23"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#image0_160_23" transform="scale(.01 .00929)" />
                </Pattern>
                <Image
                    id="image0_160_23"
                    width={100}
                    height={100}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEnklEQVR4nO2dWagdNRjH49arqLjRgnUv1pdBqr6IKJa6bxdtBREVH5RacBe0glooUhcqQn2wCFdEFISKKFKpooJ9anF90CtCrRu4a13Qaq3t/UloCoc6k8nMyczJTP8/GDgPJ9/35fxPvmSSTMYYIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEPkARwErgfXAex293gaeAeaYLgOcAPxKf/gHONd0FWA1/eMLYE/TRYBf6CezTBehv2Smi9BfMtNF6C+Z6SL0l8x0EXYjQYCDgOuBuxu4FgEHS5BAQYAZwFc0y2fAdLWQMEGW0Q6rJEiYIKtoj8vVh5QL8jzt8ZNNkerU0xHE8pwESUsQywINe9MS5MfKoy76SzakIH9VWIv5wWPnWQkSR5DJCn/qOcBWj635aiG0J4izf7/H1rfAoaGG+krWsiDTgA899p6WIC0K4nycVJK6Lgsx0leytgUJmKKxqesQCWJaFaQsdT0lQUx7gjhfJ5ekrgt9hftKNipBnL8HPba/KUxd9JdsxIKMAR957E9IkBYFcaKcUpK6Lsgr1FeyUbaQAb8Pe3x8/b9lX/pLloggNnVNevw8IUFaFMSJciqwrcDPFHD+4Jf7SpZCCxnwv9zj60vgQAnSriA2dX3s8fe4BGlRECfKaSWpa55SVjHfN7Sh7hOPz3clSFpslyCJIUESQ4IkhgRJDAmSGBIkMSRIYkiQxJAgiSFBEkOCJIYESQwJkhgSJDEkSGJIkMSQILuRIO8AdwKXAOPAXXaJku4/9LkBWApcClwE3Ai8nrIgfwJXehb6r3Lf6Zog29ya+N4F9TrTPf8xFMbtdoh5AOXcgN0XZ5XseU1RkIUB9Toe2DSME2vkc+KxvCzogeAfpTmmdn0+fMizTl6pUK/rht3k4NtRV/VHOKLiWcExW+cgq3P8PUB9go+dtSkN+Lmmnw+sgf2ANQzPhtCgB4L/lPi8D8zM8TWjpj/7pxmrWK+Xa/jZDJyz08AedsMvsMRtn/ddawsMrqshyLoCW2sD4tj1siOfK4B9PP72B64GHsop/0JBLL/VqNdEga3JgthvB46r6mensxsitpCNdTvQ2ACne1rIvpFayIomAh/3BH5kBTtHe/qQi6MHXh7PLIo5r2IfUjTSWtxE4DM9P+QjFeysKLCxHTg8euDl8ezlTu/JY00FOws9ws5rKnj7JoI8toY4Bc4G/i2wsd6MCPsMuefHXBRQfrbn6PZNRTeVMQK/xRO4vQu/xg4UcsrZwcO1bkRRxE1mRLgbVjwt996iQYMr+52n/MomAx9zbyDwYc+RWuz6nHE37WCHpGXHrE5rLPCwur1REuNGd/LPfDeXdTPwZkmZzXlD8diBL4h8YzcVdDhLw7izr/4mLve0Fbwdz8dimUkEl3Jj8VJr7zKxjoAnIwQ9kdoLWNixXGD7jWGw6e+AUQR/R83ZW1vmVpMo7Fjz+L1m+n2ssVFVYPDHuJdyhfYr9lVLs03iAIe56Y0tgfWy00FnmFQAjnVzM6+5Bxz/cJf9/Cpwm/2O6RjAdPdmhRfdnJS937Anl9pR11vAfcCJwzr6Dz6FksunMkwyAAAAAElFTkSuQmCC"
                />
            </Defs>
        </Svg>
    )
}

export default Truck