import { BaseSignUp, Endpoints } from "@/types/types";

export default class AuthFetch {
    private baseUrl = process.env.EXPO_PUBLIC_BASE_URL!;

    private async request<T>(endpoint: Endpoints, options: RequestInit = {}): Promise<T> {
        if (!this.baseUrl) throw new Error('Base URL is not set');

        const { data, error } = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        }).then((res) => res.json());

        if (error) {
            throw new Error(error);
        }
        return data;
    }

    signUp = async (payload: BaseSignUp) => {
        return this.request('/apicreateprofile', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
}