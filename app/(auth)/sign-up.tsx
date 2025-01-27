import InputField from '@/components/Form/InputField';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import FullButton from '@/components/FullButton';
import OAuth from '@/components/Form/OAuth';
import { useDebounce } from '@/lib/Hooks/useDebounce';
import clsx from 'clsx';
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUp() {
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isLoaded, signUp } = useSignUp();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);

    const debouncedEmail = useDebounce(email, 500);
    const debouncedFullName = useDebounce(fullName, 500);
    const debouncedPassword = useDebounce(password, 500);
    const debouncedConfirmPassword = useDebounce(confirmPassword, 500);

    useEffect(() => {
        if (debouncedEmail.length > 0) {
            if (!debouncedEmail.includes('@')) {
                setErrors((prev) => ({ ...prev, email: 'Invalid email' }));
            } else {
                setErrors((prev) => ({ ...prev, email: '' }));
            }
        }
    }, [debouncedEmail]);

    useEffect(() => {
        if (debouncedFullName.length === 0) return;

        if (debouncedFullName.length < 3) {
            setErrors((prev) => ({ ...prev, name: 'Full name must be at least 3 characters' }));
        } else {
            setErrors((prev) => ({ ...prev, name: '' }));
        }
    }, [debouncedFullName]);

    useEffect(() => {
        if (debouncedPassword.length === 0) return;
        if (debouncedConfirmPassword.length === 0) return;

        if (debouncedPassword.length < 8) {
            setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters' }));
        } else if (debouncedPassword !== debouncedConfirmPassword) {
            setErrors((prev) => ({ ...prev, password: 'Passwords do not match' }));
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }
    }, [debouncedPassword, debouncedConfirmPassword]);


    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: '',
        miscellaneous: ''
    });

    const onSignUpPress = async () => {
        if (!isLoaded || loading) return;

        // Start sign-up process using email and password provided
        try {
            setLoading(true);
            await signUp.create({
                emailAddress: debouncedEmail.trim(),
                password: debouncedPassword,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setPendingVerification(true);
            router.push({
                pathname: `/(auth)/verify`,
                params: {
                    email: encodeURI(debouncedEmail)
                }
            });
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
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
        email.length > 0 &&
        fullName.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0 &&
        !pendingVerification &&
        isLoaded &&
        !loading
    );

    return (
        <View className='relative flex-1'>
            <ScrollView className='flex-1'>
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
                            secureTextEntry={false}
                            icon={require("@/assets/images/cold/user.png")}
                            autoCapitalize='words'
                            placeholder='Full Name'
                            editable={!canProceed}
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
                            editable={!canProceed}
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
                            editable={!canProceed}
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
                            editable={!canProceed}
                            autoCorrect={false}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            value={confirmPassword}
                        />
                        {hasError && <Text className='text-center text-red-600 opacity-70 my-3'>
                            {Object.values(errors).filter((err) => err !== "").join(", ")}
                        </Text>}

                        <FullButton
                            title={canProceed ? 'Continue' : "Please provide your details."}
                            canProceed={canProceed}
                            loading={loading || pendingVerification}
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