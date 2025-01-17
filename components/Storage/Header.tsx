import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../Form/InputField';
import Target from '@/assets/svgs/storage/target';


export default function Header() {
    return (
        <View className='h-[117px] bg-primary flex-row items-end p-5 gap-3'>
            <TouchableOpacity
                className='bg-white h-[50px] w-[50px] items-center justify-center rounded-full'
            >
                <Image
                    source={require("@/assets/images/cold/back.png")}
                    resizeMode='contain'
                    className='w-[22px] h-[22px] invert'
                />
            </TouchableOpacity>
            <View className='flex-1'>
                <InputField
                    label=''
                    secureTextEntry={false}
                    keyboardType='default'
                    placeholder='Find a Cold Storage'
                    containerStyle='rounded-full px-2'
                    iconStyle='opacity-60'
                    fullyRounded={true}
                />
                <TouchableOpacity
                    className='bg-white h-[50px] w-[50px] items-center justify-center rounded-full absolute top-[35%] right-0 -translate-y-1/2'
                >
                    <Target
                        width={24}
                        height={24}
                    />
                    <View className='absolute top-0 left-0 w-full h-full items-center justify-center opacity-20'>
                        <Target
                            width={'100%'}
                            height={"100%"}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}