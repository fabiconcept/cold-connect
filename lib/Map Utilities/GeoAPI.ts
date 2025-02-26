import { AutocompleteResponse, RequestParams } from "@/types/types";

export class GeoAPI {
    private static apiKey: string = '';
    private readonly baseUrl = 'https://api.geoapify.com/v1/geocode';

    constructor() {
        if(!process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY) throw new Error('GeoAPI: API key is required');
        GeoAPI.apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
    }

    private async request<T>({
        method = "GET",
        body,
        headers = {},
        ...props
    }: RequestParams): Promise<T> {
        const searchParams = new URLSearchParams(props.params);
        searchParams.append("apiKey", GeoAPI.apiKey);

        const url = `${this.baseUrl}${props.endpoint}?${searchParams.toString()}` as `http${string}://${string}/${string}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const response = await fetch(url, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error: any) {

            console.log({ error });
            if (error.name === "AbortError") {
                throw new Error("Request timed out.");
            }
            throw new Error(`Network error: ${error.message}`);
        }
    }

    public async getAutocomplete(query: string) {
        return this.request<AutocompleteResponse>({
            endpoint: `/autocomplete`,
            params: {
                text: encodeURIComponent(query)
            }
        });
    }
}