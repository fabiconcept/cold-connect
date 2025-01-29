import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
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
        const seenWelcome = await getToken('seen-welcome');

        if (!seenWelcome) {
          setInitialRoute('/(auth)/welcome');
          return;
        }

        if (token) {
          await updateUser(token);
        }

        setInitialRoute('/(root)/(tabs)/home');
      } catch (error) {
        console.error('Authentication Error:', error);
        setInitialRoute('/(root)/(tabs)/home');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

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