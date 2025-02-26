import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    extra: {
        EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
        EXPO_PUBLIC_GEOAPIFY_API_KEY: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY,
        EXPO_PUBLIC_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
    },
});
