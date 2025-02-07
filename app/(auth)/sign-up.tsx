import InputField from '@/components/Form/InputField';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import FullButton from '@/components/FullButton';
import { useDebounce } from '@/lib/Hooks/useDebounce';
import clsx from 'clsx';
import OAuth from '@/components/Form/OAuth';
import { BaseSignUp } from '@/types/types';
import { useAuthenticationStore } from '@/store/auth';
import { validateEmail, validateFullName, validatePassword } from '@/lib/utilities';

export default function SignUp() {
    const [loading, setLoading] = useState(false);

    const { signUp, error, clearError } = useAuthenticationStore();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const debouncedEmail = useDebounce(email, 500);
    const debouncedFullName = useDebounce(fullName, 500);
    const debouncedPassword = useDebounce(password, 500);
    const debouncedConfirmPassword = useDebounce(confirmPassword, 500);

    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: '',
        miscellaneous: ''
    });

    useEffect(() => {
        if (debouncedEmail.length > 0) {
            if (!validateEmail(debouncedEmail)) {
                setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
            } else {
                setErrors((prev) => ({ ...prev, email: '' }));
            }
        }

        setErrors((prev) => ({
            ...prev,
            miscellaneous: '',
        }));
        clearError();
    }, [debouncedEmail]);

    useEffect(() => {
        if (debouncedFullName.length === 0) return;

        const [isValidName, nameError] = validateFullName(debouncedFullName);
        if (!isValidName) {
            setErrors((prev) => ({ ...prev, name: nameError }));
        } else {
            setErrors((prev) => ({ ...prev, name: '' }));
        }
        setErrors((prev) => ({
            ...prev,
            miscellaneous: '',
        }));
        clearError();
    }, [debouncedFullName]);

    useEffect(() => {
        if (debouncedPassword.length === 0) return;

        const [isValidPassword, passwordError] = validatePassword(debouncedPassword);
        if (!isValidPassword) {
            setErrors((prev) => ({ ...prev, password: passwordError }));
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }
        setErrors((prev) => ({
            ...prev,
            miscellaneous: '',
        }));
        clearError();
    }, [debouncedPassword]);

    useEffect(() => {
        if (debouncedConfirmPassword.length === 0) return;

        if (debouncedPassword !== debouncedConfirmPassword) {
            setErrors((prev) => ({ ...prev, password: 'Passwords do not match' }));
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }
        setErrors((prev) => ({
            ...prev,
            miscellaneous: '',
        }));
        clearError();
    }, [debouncedConfirmPassword]);

    const onSignUpPress = async () => {
        try {
            setLoading(true);
            const payload: BaseSignUp = {
                email: debouncedEmail.trim(),
                name: debouncedFullName.trim(),
                password: debouncedPassword,
                password_confirmation: debouncedPassword,
            }

            const didSignup = await signUp(payload);

            if (!didSignup) {
                setConfirmPassword("");
                setPassword("");
                return;
            };

            router.replace({
                pathname: "/(root)/(tabs)/home",
                params: {
                    type: "new-user"
                }
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            setErrors((prev) => ({
                ...prev,
                miscellaneous: 'An error occurred during sign-up',
            }));
        } finally {
            setLoading(false);
        }
    }


    const hasError = Object.values(errors).some((error) => error !== "");
    const canProceed = !hasError && (
        debouncedEmail.length > 0 &&
        debouncedFullName.length > 0 &&
        debouncedPassword.length > 0 &&
        debouncedConfirmPassword.length > 0 &&
        !loading
    );

    return (
        <View className='relative flex-1'>
            <Image
                source={require("@/assets/images/cold/sign-up-ice 02.png")}
                resizeMode='contain'
                className='absolute top-0 right-0'
            />
            <Image
                source={require("@/assets/images/cold/sign-up-ice 01.png")}
                resizeMode='contain'
                className='absolute bottom-0 left-1/2 -translate-x-1/2'
            />
            <ScrollView className='flex-1'>
                <SafeAreaView className='flex-1 flex z-20 p-5' style={styles.container}>
                    <View className='gap-2' style={styles.textContainer}>
                        <Text className='text-primary text-4xl font-MontserratSemiBold' style={styles.titleText}>Create an Account</Text>
                        <Text className='font-MontserratSemiBold opacity-70 max-w-[90%]'>
                            Create an account to access our premium services, including
                            Cold Logistics, Cold Storage, and Buy Crates.
                        </Text>
                    </View>

                    <View className='my-10' style={styles.inputContainer}>
                        <InputField
                            label=''
                            icon={require("@/assets/images/cold/user.png")}
                            autoCapitalize='words'
                            placeholder='Full Name'
                            editable={!loading}
                            autoCorrect={false}
                            onChangeText={(name) => setFullName(name)}
                            value={fullName}
                        />
                        <InputField
                            label=''
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/at-sign.png")}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder='Email Address'
                            editable={!loading}
                            autoCorrect={false}
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                        />
                        <InputField
                            label=''
                            secureTextEntry={true}
                            icon={require("@/assets/images/cold/lock.png")}
                            autoCapitalize='none'
                            placeholder='Password'
                            editable={!loading}
                            autoCorrect={false}
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                        />
                        <InputField
                            label=''
                            secureTextEntry={true}
                            icon={require("@/assets/images/cold/lock.png")}
                            autoCapitalize='none'
                            placeholder='ReType password'
                            editable={!loading}
                            autoCorrect={false}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            value={confirmPassword}
                        />
                        {hasError && <Text className='text-center text-red-600 opacity-70 my-3'>
                            {Object.values(errors).filter((err) => err !== "").join(", ")}
                        </Text>}
                        {error.length > 0 && <Text className='text-center text-red-600 opacity-70 my-3'>
                            {Object.values(error).filter((err) => err !== "").join(", ")}
                        </Text>}

                        <FullButton
                            title={canProceed ? 'Continue' : "Please provide your details."}
                            canProceed={canProceed}
                            loading={loading}
                            onPress={onSignUpPress}
                            className={clsx(
                                'py-4 rounded-xl',
                                canProceed ? "bg-primary text-white" : "bg-primary/20"
                            )}
                            textClassName={clsx(
                                'font-MontserratSemiBold',
                                canProceed ? "text-white" : "text-primary"
                            )}
                        />

                        <Text className='text-center opacity-70 my-5'>
                            By Logging in, you agree to our <Text className='font-MontserratSemiBold text-primary'>Terms & Conditions</Text> and
                            <Text className='font-MontserratSemiBold text-primary'> Privacy Policies</Text>.
                        </Text>

                        <View className='flex flex-row justify-center items-center gap-2 mt-5 mb-5'>
                            <View className='flex-1 h-px bg-gray-200'></View>
                            <Text className='italic opacity-70'>Or Sign Up With</Text>
                            <View className='flex-1 h-px bg-gray-200'></View>
                        </View>

                        <OAuth className='my-3' />


                        <Link href={"/(auth)/sign-in"} className='text-center py-5'>
                            Already have an account?
                            <Text className='font-MontserratSemiBold text-primary'> Sign In</Text>
                        </Link>
                    </View>
                </SafeAreaView >
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textContainer: {
        gap: 5
    },
    titleText: {
        fontSize: 28,
        fontWeight: '600'
    },
    inputContainer: {
        marginBlock: 60,
        gap: 10
    },
})