import { Platform, Share, ToastAndroid } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';

export function maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '';

    const [username, domain] = email.split('@');
    const domainParts = domain.split('.');

    const maskedUsername = username.slice(0, 4) + '*'.repeat(10);

    const maskedDomain = '*'.repeat(3) + '.' + domainParts[domainParts.length - 1];

    return `${maskedUsername}@${maskedDomain}`;
}

export const onShare = async (payload: string) => {
    try {
        const result = await Share.share({
            message: payload,
            title: 'Share this Hub', // iOS only
            url: '', // iOS only (used instead of message if provided)
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

export function validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validatePassword(password: string): [boolean, string] {
    const lengthRegex = /.{8,}/; // At least 8 characters long
    const uppercaseRegex = /[A-Z]/; // Contains at least one uppercase letter
    const lowercaseRegex = /[a-z]/; // Contains at least one lowercase letter
    const numberRegex = /\d/; // Contains at least one number
    const specialCharRegex = /[^A-Za-z0-9]/; // Contains at least one special character

    let errorMessage = '';
    let condition = true;

    if (!lengthRegex.test(password)) {
        errorMessage = 'Password: at least 8 characters. ';
        condition = false;
    } else if (!uppercaseRegex.test(password)) {
        errorMessage = 'Include 1 uppercase letter. ';
        condition = false;
    } else if (!lowercaseRegex.test(password)) {
        errorMessage = 'Include 1 lowercase letter. ';
        condition = false;
    } else if (!numberRegex.test(password)) {
        errorMessage = 'Include 1 number. ';
        condition = false;
    } else if (!specialCharRegex.test(password)) {
        errorMessage = 'Include 1 special character. ';
        condition = false;
    }

    return [condition, errorMessage];
}

function validateName(name: string): boolean {
    const test = /[^a-zA-Z\s]/.test(name);
    return test;
}

export function validateFullName(name: string): [boolean, string] {
    let errorMessage = "";
    let condition = true;
    const splitName = name.trim().split(" ");

    if (splitName.length < 2) {
        errorMessage = "Enter Fullname.";
        condition = false;
    }
    else if (splitName.length > 2) {
        errorMessage = "Only first and last name";
        condition = false;
    }
    else if (splitName[0].length < 3) {
        errorMessage = "(First name) - too short";
        condition = false;
    }
    else if (splitName[1].length < 3) {
        errorMessage = "(Last name) - too short";
        condition = false;
    }
    else if (validateName(splitName[0])) {
        errorMessage = "(First name) - Avoid numbers and special characters.";
        condition = false;
    }
    else if (validateName(splitName[1])) {
        errorMessage = "(Last name) - Avoid numbers and special characters.";
        condition = false;
    }
    else if (validateName(name)) {
        errorMessage = "Stick to common letters in your name.";
        condition = false;
    }
    else if (name.toLowerCase() === "john doe") {
        errorMessage = "Enter your real name, not 'John Doe.";
        condition = false;
    }


    return [condition, errorMessage];
}

export function getGeoRegionInNigeria(latitude: number, longitude: number) {
    const regions = {
        "North-West": { minLat: 12, maxLat: 14, minLong: 3, maxLong: 7 },
        "North-East": { minLat: 10, maxLat: 13, minLong: 8, maxLong: 14 },
        "North-Central": { minLat: 8, maxLat: 12, minLong: 3, maxLong: 9 },
        "South-West": { minLat: 6, maxLat: 8, minLong: 2, maxLong: 6 },
        "South-East": { minLat: 5, maxLat: 7, minLong: 7, maxLong: 10 },
        "South-South": { minLat: 4, maxLat: 6, minLong: 5, maxLong: 8 }
    };

    for (const [region, bounds] of Object.entries(regions)) {
        if (
            latitude >= bounds.minLat && latitude <= bounds.maxLat &&
            longitude >= bounds.minLong && longitude <= bounds.maxLong
        ) {
            return String(region).toLowerCase();
        }
    }

    return String("Unknown").toLowerCase();
}

export function copyToClipboard(text: string): void {
    if (Platform.OS === 'ios') {
        const writeOptions = {
            type: 'text',
            data: text,
        };
        Clipboard.setString(text);
    } else {
        Clipboard.setString(text);
    }

    const toastMessage = 'Copied to clipboard';
    ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
}