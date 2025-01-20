import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { LogBox } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddToCartButton from '@/components/general sub components/AddToCartButton';

LogBox.ignoreLogs([
  "Warning: ",
]);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    MontserratBlack: require('../assets/fonts/Montserrat-Black.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratExtraLight: require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratThin: require('../assets/fonts/Montserrat-Thin.ttf'),
    MontserratBlackItalic: require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    MontserratBoldItalic: require('../assets/fonts/Montserrat-BoldItalic.ttf'),
    MontserratExtraBoldItalic: require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    MontserratExtraLightItalic: require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    MontserratItalic: require('../assets/fonts/Montserrat-Italic.ttf'),
    MontserratLightItalic: require('../assets/fonts/Montserrat-LightItalic.ttf'),
    MontserratMediumItalic: require('../assets/fonts/Montserrat-MediumItalic.ttf'),
    MontserratSemiBoldItalic: require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    MontserratThinItalic: require('../assets/fonts/Montserrat-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <AddToCartButton />
    </GestureHandlerRootView>
  );
}
