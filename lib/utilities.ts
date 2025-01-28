import { Share } from "react-native";

export function maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '';

    const [username, domain] = email.split('@');
    const domainParts = domain.split('.');

    const maskedUsername = username.slice(0, 4) + '*'.repeat(10);

    const maskedDomain = '*'.repeat(3) + '.' + domainParts[domainParts.length - 1];

    return `${maskedUsername}@${maskedDomain}`;
}


export const onShare = async () => {
    try {
        const result = await Share.share({
            message: 'Check out this awesome content! https://example.com',
            title: 'Awesome Content', // iOS only
            url: 'https://example.com', // iOS only (used instead of message if provided)
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // User shared with specific activity (iOS only)
                console.log('Shared with activity type:', result.activityType);
            } else {
                // User shared without specifying an activity
                console.log('Content shared');
            }
        } else if (result.action === Share.dismissedAction) {
            // User dismissed the share dialog
            console.log('Share dismissed');
        }
    } catch (error) {
        console.error('Error sharing:', error);
    }
};