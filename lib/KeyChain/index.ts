import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string, itemId: string = 'coldUserToken') {
    try {
        await SecureStore.setItemAsync(itemId, token);
        console.log("Token saved successfully");
    } catch (error) {
        console.error('Error saving token:', error);
        throw error;
    }
}

export async function getToken(itemId: string = 'coldUserToken'): Promise<string | null> {
    try {
        const token = await SecureStore.getItemAsync(itemId);
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
}

export async function removeToken(itemId: string = 'coldUserToken') {
    try {
        await SecureStore.deleteItemAsync(itemId);
        console.log("Token removed successfully");
    } catch (error) {
        console.error('Error removing token:', error);
        throw error;
    }
}