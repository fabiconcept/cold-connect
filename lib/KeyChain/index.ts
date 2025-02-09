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

export async function removeAllDistanceKeys(prefix: string = 'distance_') {
    try {
        // Get all available secure store keys that start with the prefix
        const allKeys = await SecureStore.getItemAsync('secureStoreKeyList') || '[]';
        const keyList: string[] = JSON.parse(allKeys);
        const distanceKeys = keyList.filter(key => key.startsWith(prefix));

        // Delete each key individually since SecureStore doesn't have batch removal
        const deletionPromises = distanceKeys.map(key => SecureStore.deleteItemAsync(key));
        await Promise.all(deletionPromises);

        // Update the key list
        const updatedKeys = keyList.filter(key => !key.startsWith(prefix));
        await SecureStore.setItemAsync('secureStoreKeyList', JSON.stringify(updatedKeys));

        console.log(`Removed ${distanceKeys.length} distance keys successfully`);
    } catch (error) {
        console.error('Error removing distance keys:', error);
        throw error;
    }
}

// Helper function to add a key to the key list when saving new items
export async function addKeyToList(key: string) {
    try {
        const existingKeys = await SecureStore.getItemAsync('secureStoreKeyList') || '[]';
        const keyList: string[] = JSON.parse(existingKeys);

        if (!keyList.includes(key)) {
            keyList.push(key);
            await SecureStore.setItemAsync('secureStoreKeyList', JSON.stringify(keyList));
        }
    } catch (error) {
        console.error('Error adding key to list:', error);
    }
}