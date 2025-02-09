import { Coordinates } from "@/types/types";
import { getToken, removeAllDistanceKeys, removeToken, saveToken } from "../KeyChain";

export const calculateRegion = ({
    latitude,
    longitude,
}: {
    latitude: number | null;
    longitude: number | null;
}) => {
    if (!latitude || !longitude) {
        return {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };
};

export const calculateRegionWithDestination = ({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
}: {
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude?: number | null;
    destinationLongitude?: number | null;
}) => {
    if (!userLatitude || !userLongitude) {
        return {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    if (!destinationLatitude || !destinationLongitude) {
        return {
            latitude: userLatitude,
            longitude: userLongitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    const minLat = Math.min(userLatitude, destinationLatitude);
    const maxLat = Math.max(userLatitude, destinationLatitude);
    const minLng = Math.min(userLongitude, destinationLongitude);
    const maxLng = Math.max(userLongitude, destinationLongitude);

    const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
    const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

    const latitude = (userLatitude + destinationLatitude) / 2;
    const longitude = (userLongitude + destinationLongitude) / 2;

    return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
    };
};

type CacheEntry = {
    distance: number;
    timestamp: number;
};

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class DistanceCache {
    private static generateCacheKey(from: Coordinates, to: Coordinates): string {
        // Sort coordinates to ensure same key regardless of order
        const coords = [
            [from.latitude, from.longitude],
            [to.latitude, to.longitude]
        ].sort((a, b) => a[0] - b[0]);

        return `distance_${coords[0][0]}_${coords[0][1]}_${coords[1][0]}_${coords[1][1]}`;
    }

    static async getDistance(
        from: Coordinates,
        to: Coordinates,
        apiKey: string
    ): Promise<number | null> {
        try {
            const cacheKey = this.generateCacheKey(from, to);

            // Try to get from cache first
            const cachedData = await getToken(cacheKey);

            if (cachedData) {
                const cache: CacheEntry = JSON.parse(cachedData);

                // Check if cache is still valid
                if (Date.now() - cache.timestamp < CACHE_EXPIRY) {
                    console.log('Retrieved distance from cache');
                    return cache.distance;
                }
                // Cache expired, remove it
                await removeToken(cacheKey);
            }

            // If not in cache or expired, fetch from API
            const response = await fetch(
                `https://api.geoapify.com/v1/routing?` +
                `waypoints=${from.latitude},${from.longitude}|${to.latitude},${to.longitude}` +
                `&mode=drive&apiKey=${apiKey}`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const distanceInKm = Math.round((data.features[0].properties.distance / 1000) * 100) / 100;

            // Store in cache
            const cacheEntry: CacheEntry = {
                distance: distanceInKm,
                timestamp: Date.now()
            };

            await saveToken(JSON.stringify(cacheEntry), cacheKey);

            return distanceInKm;
        } catch (error) {
            console.error('Error calculating distance:', error);
            return null;
        }
    }

    static async clearCache(): Promise<void> {
        try {
            await removeAllDistanceKeys("distance_");
        } catch (error) {
            console.error('Error clearing distance cache:', error);
        }
    }
}