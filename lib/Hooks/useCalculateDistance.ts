import { Coordinates } from "@/types/types";
import { useEffect, useState } from "react";
import { DistanceCache } from "../Map Utilities";

export function useCalculateDistance(): [(number | null), boolean, React.Dispatch<React.SetStateAction<{ start: Coordinates | null, end: Coordinates | null }>>] {
    const [distance, setDistance] = useState<number | null>(null);
    const [coordinates, setCoordinates] = useState<{ start: Coordinates | null, end: Coordinates | null }>({ start: null, end: null });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

    useEffect(() => {
        const { start, end } = coordinates;
        if (!apiKey || !start || !end) {
            setIsLoading(false);
            setDistance(null);
            return;
        }

        (async () => {
            try {
                setIsLoading(true);
                const distance = await DistanceCache.getDistance(start, end, apiKey);

                setDistance(distance);
            } catch (error) {
                console.error("Error calculating distance:", error);
            } finally {
                setIsLoading(false);
            }
        })();

    }, [coordinates]);

    return [distance, isLoading, setCoordinates];
}
