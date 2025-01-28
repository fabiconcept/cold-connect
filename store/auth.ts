import { fetchAPI } from "@/lib/fetch";
import { AuthenticatedStore, SignUpErrorResponse, SignUpSuccessResponse, UnAuthenticatedStore } from "@/types/types";
import { create } from "zustand";

export const useAuthenticationStore = create<AuthenticatedStore | UnAuthenticatedStore>((set) => ({
    activeId: "",
    activeUser: null,
    isSignedIn: false,
    error: [],
    clearError: () => {
        set({
            error: []
        })
    },
    signUp: async (payload) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;
        if (!baseUrl) throw new Error('Base URL is not set');

        try {
            const response: SignUpSuccessResponse | SignUpErrorResponse = await fetchAPI(`http://192.168.88.218:8000/api/apisignup`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.success) {
                const temp_error: string[] = []
                Object.values(response.errors).flat().forEach((error) => {
                    temp_error.push(error)
                })
                set({ error: temp_error });
                return false;
            }

            const { token, user } = response;

            set({
                activeId: token,
                activeUser: user,
                error: [],
                isSignedIn: true,
            })

            return true
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during sign up!")
        }
    },
    signIn: async (payload) => {

    },
    signOut: async () => { },
}));