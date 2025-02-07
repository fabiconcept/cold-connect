import { useLocationStore, useStorageStore } from "@/store";
import { useHubsNearMe } from "@/store/Public/Public Storage Feed Endpoints/nearByHubs";
import { useState } from "react";
import { getGeoRegionInNigeria } from "../utilities";
import { useHubsAroundMe } from "@/store/Public/Public Storage Feed Endpoints/hubsAround";
import { useHubsByRegion } from "@/store/Public/Public Storage Feed Endpoints/hubsByRegion";

export const useHomeActions = (): [boolean, () => Promise<void>] => {
    const [loading, setLoading] = useState(false);
    const { load_hubs_near_me } = useHubsNearMe();
    const { load_hubs: load_hubs_around_me } = useHubsAroundMe();
    const { latitude, longitude } = useLocationStore();
    const { loadStorages } = useStorageStore();
    const { setSelectedRegion, load_regions, load_hubs } = useHubsByRegion();

    const reload = async () => {
        try {
            setLoading(true);
            const region = getGeoRegionInNigeria(latitude!, longitude!);

            const userRegion = region === "unknown" ? "" : region;

            setSelectedRegion(userRegion);

            await Promise.all([
                load_hubs_around_me(userRegion),
                load_regions(),
                load_hubs(region),
                load_hubs_near_me({ lat: latitude!, lng: longitude!, radius: 1000, limit: "3" }),
                loadStorages()
            ]);

        } catch (error) {
            console.log(error)
            console.log(JSON.stringify(error, null, 2));
        } finally {
            setLoading(false);
        }
    }

    return [loading, reload];
};