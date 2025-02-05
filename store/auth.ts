import { fetchAPI, fetchProtectedAPI } from "@/lib/fetch";
import { removeToken, saveToken } from "@/lib/KeyChain";
import { ActiveUser, AuthenticatedStore, CreateProfileSuccessResponse, LoginErrorResponse, LoginSuccessResponse, ProfileUpdateResponse, SignUpErrorResponse, SignUpSuccessResponse, UnAuthenticatedStore, UpdateProfilePhotoErrorResponse, UpdateProfilePhotoSuccessResponse } from "@/types/types";
import { Alert, Platform, ToastAndroid } from "react-native";
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


            const createProfile: CreateProfileSuccessResponse = await fetchAPI(`${baseUrl}/apicreateprofile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${response.token}`
                },
                method: 'POST',
                body: JSON.stringify({
                    "phone": "",
                    "address": "",
                    "country": "Nigeria",
                }),
            });

            const { token, user } = response;
            const { profile } = createProfile;

            set({
                activeId: token,
                activeUser: {
                    ...user,
                    profile: profile
                },
                error: [],
                isSignedIn: true,
            });

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
                activeUser: {
                    ...user,
                    profile: {
                        ...user.profile,
                        photo: `${baseUrl.slice(0, -4)}${user.profile.photo}`
                    }
                },
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
    signOut: async (activeId: string) => {
        if (!baseUrl) throw new Error('Base URL is not set');

        try {
            await fetchProtectedAPI(`${baseUrl}/apisignout`, activeId, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
            });
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            console.log("An error occurred during sign out!");
            throw new Error("An error occurred during sign out!");
        } finally {
            await removeToken();
            set({
                activeId: "",
                activeUser: null,
                isSignedIn: false,
                error: [],
            });
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
                activeUser: {
                    ...response,
                    profile: {
                        ...response.profile,
                        photo: `${baseUrl.slice(0, -4)}${response.profile.photo}`
                    }
                },
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
    },
    updateProfilePhoto: async (formData, activeId) => {
        try {
            const response: UpdateProfilePhotoSuccessResponse | UpdateProfilePhotoErrorResponse = await fetchProtectedAPI(`${baseUrl}/user/update-photo`, activeId, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                method: "POST",
                body: formData
            });


            if (response.data === undefined) {
                set({
                    error: [response.error]
                });
                return;
            }

            const { photo_url } = response.data;
            const photo = `${baseUrl.slice(0, -4)}${photo_url}`;

            set((prev) => {
                if (!prev.isSignedIn) return prev;
                const prevProfile = prev.activeUser.profile;

                return {
                    ...prev,
                    activeUser: {
                        ...prev.activeUser,
                        profile: {
                            ...prevProfile,
                            photo: photo
                        }
                    }
                }
            });

            if (Platform.OS === "ios") {
                Alert.alert("Profile Photo Updated.", "You have successfully updated your profile photo.");
            } else {
                ToastAndroid.show("Profile Photo Updated.", ToastAndroid.BOTTOM);
            }

        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            throw new Error("An error occurred during update!")
        }
    },
    updateProfile: async (payload, activeId) => {
        try {
            set({
                updatingUser: true,
            });

            const response: ProfileUpdateResponse = await fetchProtectedAPI(`${baseUrl}/user/update-profile`, activeId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const { success } = response;

            if (!success) {
                set({
                    error: [response.error ?? "An error occurred during update!"]
                });
                return;
            }

            set({
                activeUser: {
                    ...response.user,
                    profile: {
                        ...response.user.profile,
                        photo: `${baseUrl.slice(0, -4)}${response.user.profile.photo}`
                    }
                },
                error: []
            });

        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            set({
                error: ["An error occurred during update!"]
            });
        } finally {
            set({
                updatingUser: false,
            });
        }
    }
}));