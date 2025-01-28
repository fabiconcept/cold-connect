import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, router } from 'expo-router';
import { getToken } from '@/lib/KeyChain';
import { useAuthenticationStore } from '@/store/auth';

export default function Index() {
  const { updateUser } = useAuthenticationStore();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await getToken();

        if (token) {
          await updateUser(token);
          setInitialRoute('/(root)/(tabs)/home');
        } else {
          setInitialRoute('/(auth)/welcome');
        }
      } catch (error) {
        console.error('Authentication Error:', error);
        setInitialRoute('/(auth)/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    return () => {
      // Cleanup if needed
    };
  }, [updateUser]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={100} />
      </View>
    );
  }

  if (initialRoute) {
    return <Redirect href={initialRoute as any} />;
  }

  return null;
}