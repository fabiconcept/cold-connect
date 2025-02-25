import { Coordinates } from "@/types/types";
import { useEffect, useState } from "react";
import { DistanceCache } from "../Map Utilities";
import { useLocationStore } from "@/store";

export function useHubDistance(): [(number | null), boolean, React.Dispatch<React.SetStateAction<Coordinates | null>>] {
    const { latitude, longitude, hasLocationPermission } = useLocationStore();

    const [distance, setDistance] = useState<number | null>(null);
    const [hubCoordinates, setHubCoordinates] = useState<Coordinates | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

    if (!hasLocationPermission) return [null, false, setHubCoordinates];

    useEffect(() => {
        if (!apiKey || !hubCoordinates || !latitude || !longitude) {
            setIsLoading(false);
            setDistance(null);
            return;
        }

        (async () => {
            try {
                setIsLoading(true);
                const distance = await DistanceCache.getDistance({
                    latitude,
                    longitude
                }, hubCoordinates, apiKey);

                setDistance(distance);
            } catch (error) {
                console.error("Error calculating distance:", error);
            } finally {
                setIsLoading(false);
            }
        })();

    }, [hubCoordinates, latitude, longitude]);

    return [distance, isLoading, setHubCoordinates];
}