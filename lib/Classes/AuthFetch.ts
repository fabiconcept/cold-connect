import { BaseSignUp } from "@/types/types";
import { fetchAPI } from "../fetch";

export default class AuthFetch {
    private baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

    constructor() {
        if (!this.baseUrl) throw new Error('Base URL is not set');
    }

    signUp = async (payload: BaseSignUp) => {
        return fetchAPI(`http://192.168.88.218:8000/api/apisignup`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
}