import { useAuthenticationStore } from "@/store/auth";
import { Endpoints } from "@/types/types";
import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: `http${string}://${string}${Endpoints}`, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const fetchProtectedAPI = async (url: `http${string}://${string}${Endpoints}`, options?: RequestInit) => {
    const { isSignedIn, activeId } = useAuthenticationStore();

    if (!isSignedIn) {
        throw new Error(`Not signed in, unable to access protected route: ${url}`);
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: `Bearer ${activeId}`,
            }
        });
        if (!response.ok) {
            new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const useFetch = <T>(url: `http${string}://${string}${Endpoints}`, options?: RequestInit) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchAPI(url, options);
            setData(result.data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};