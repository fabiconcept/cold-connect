import { fetchAPI } from "@/lib/fetch";
import { Hub, HubsAroundMeErrorResponse, HubsAroundMeResponse, Tag, URL } from "@/types/types";
import { create } from "zustand";

// const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;
const baseUrl = `http://46.101.23.53/api`;

interface hubAroundMeStore extends HubsAroundMeResponse {
    loading: boolean;
    regions: { label: string; value: string; }[];
    selectedRegion: string | null;
    error: string;
    justSearch: boolean;
    searchQuery: string;
    search_for_hubs: (searchQuery: string) => Promise<void>;
    reset_search: () => void;
    load_regions: () => Promise<void>;
    load_more: (url: URL) => Promise<void>;
    load_hubs: (region: string) => Promise<void>;
    setSelectedRegion: (region: string) => Promise<void>;
}

interface hubAroundMeStoreError extends HubsAroundMeErrorResponse {
    loading: boolean;
    error: string;
    justSearch: boolean;
    searchQuery: string;
    search_for_hubs: (searchQuery: string) => Promise<void>;
    reset_search: () => void;
    regions: { label: string; value: string; }[];
    selectedRegion: string | null;
    load_regions: () => Promise<void>;
    load_more: (url: URL) => Promise<void>;
    load_hubs: (region: string) => Promise<void>;
    setSelectedRegion: (region: string) => Promise<void>;
}

export const useHubsByRegion = create<hubAroundMeStore | hubAroundMeStoreError>((set, get) => ({
    allstorages: null,
    error: "",
    loading: false,
    morepages: false,
    tags: null,
    regions: [],
    justSearch: false,
    searchQuery: "",
    load_more: async (url) => {
        if (!url) return;
        try {
            const response: HubsAroundMeResponse = await fetchAPI(url);

            const { allstorages, morepages, tags } = response;

            const { allstorages: prevAllStorages } = get();

            const updadtedAllStorages = {
                ...allstorages,
                data: [...(prevAllStorages?.data || []), ...allstorages.data]
            }

            set({
                allstorages: updadtedAllStorages,
                morepages,
                tags,
                error: "",
            });


        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load hubs!"
            });
        }
    },
    reset_search: () => {
        set({
            loading: false,
            justSearch: false,
            error: "",
            searchQuery: "",
        });
    },
    search_for_hubs: async (searchQuery) => {
        try {
            set({
                loading: true,
                justSearch: true,
                searchQuery: searchQuery,
            });

            const response: Hub[] = await fetchAPI(`${baseUrl}/search/cold-storage?keyword=${searchQuery}`);

            set({
                allstorages: {
                    current_page: 0,
                    data: response,
                    per_page: response.length,
                    total: response.length,
                    last_page: 1,
                    first_page_url: "",
                    from: null,
                    last_page_url: "",
                    links: [],
                    next_page_url: null,
                    path: "",
                    prev_page_url: null,
                    to: null,
                },
                error: "",
            });
        } catch (error) {
            console.error(error);
            set({
                error: "An error occurred while searching",
            });
        } finally {
            set({ loading: false });
        }

    },
    selectedRegion: null,
    load_regions: async () => {
        try {
            const response: Omit<Tag, "pivot">[] = await fetchAPI(`${baseUrl}/alltags`);
            const regions = [...new Set(response.map((region) => region.slug))]
                .sort((a, b) => a.localeCompare(b))
                .map((slug) => {
                    return {
                        label: slug
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" "),
                        value: slug
                    };
                });

            set({
                regions: regions,
                error: "",
            });
        } catch (error) {
            console.error(error);
            set({
                error: "An error occurred while loading regions",
            });
        }

    },
    load_hubs: async (region: string) => {
        try {
            set({
                loading: true
            });

            const response: HubsAroundMeResponse = await fetchAPI(`${baseUrl}/tags-storage/${region}`);

            const { allstorages, morepages, tags } = response;

            set({
                allstorages,
                morepages,
                tags,
                error: "",
                selectedRegion: region
            })


        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: "An error occurred during load hubs!"
            });
        } finally {
            set({
                loading: false
            });
        }
    },
    setSelectedRegion: async (region) => {
        if (!region) return;

        set({
            selectedRegion: region,
        });
    }
}));