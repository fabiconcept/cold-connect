import { fetchAPI, fetchProtectedAPI } from "@/lib/fetch";
import { removeToken, saveToken } from "@/lib/KeyChain";
import { ActiveUser, AuthenticatedStore, LoginErrorResponse, LoginSuccessResponse, SignUpErrorResponse, SignUpSuccessResponse, UnAuthenticatedStore } from "@/types/types";
import { router } from "expo-router";
import { create } from "zustand";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL! as `http${string}://${string}`;

export const useAuthenticationStore = create<AuthenticatedStore | UnAuthenticatedStore>((set) => ({
    activeId: "",
    activeUser: null,
    isSignedIn: false,
    error: [],
    updatingUser: false,
    clearError: () => {
        set({
            error: []
        })
    },
    signUp: async (payload) => {
        if (!baseUrl) throw new Error('Base URL is not set');

        try {
            const response: SignUpSuccessResponse | SignUpErrorResponse = await fetchAPI(`${baseUrl}/apisignup`, {
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

            return true;
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during sign up!")
        }
    },
    signIn: async (payload) => {
        if (!baseUrl) throw new Error('Base URL is not set');

        try {
            const response: LoginSuccessResponse | LoginErrorResponse = await fetchAPI(`${baseUrl}/apisignin`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.success) {
                const temp_error = [`${response.errors}`]
                set({ error: temp_error });
                return false;
            }

            const { token, user } = response;

            set({
                activeId: token,
                activeUser: user,
                error: [],
                isSignedIn: true,
            });

            await saveToken(token);

            return true;
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during sign up!")
        }
    },
    signOut: async () => {
        if (!baseUrl) throw new Error('Base URL is not set');

        try {
            await fetchProtectedAPI(`${baseUrl}/apisignout`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
            });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during sign out!");
        } finally {
            await removeToken();
            router.replace('/(auth)/sign-in');
        }
        // Log out function
    },
    updateUser: async (activeId) => {
        try {
            set({ updatingUser: true });
            const response: ActiveUser = await fetchAPI(`${baseUrl}/user`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${activeId}`
                }
            });

            set({
                activeUser: response,
                activeId: activeId,
                isSignedIn: true,
                error: [],
            });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during update!");
        } finally {
            set({ updatingUser: false });
        }
    }
}));