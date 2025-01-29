import { FlatListProps, ImageSourcePropType, PressableProps, TextInputProps } from "react-native";

declare IconNames = "link" | "search" | "image" | "menu" | "radio" | "minus" | "plus" | "info" | "check" | "book" | "pause" | "frown" | "mail" | "home" | "star" | "filter" | "meh" | "save" | "user" | "phone" | "paperclip" | "inbox" | "lock" | "cloud" | "eye" | "camera" | "delete" | "heart" | "chrome" | "github" | "upload" | "download" | "unlock" | "play" | "tag" | "calendar" | "database" | "key" | "flag" | "layout" | "printer" | "tool" | "gift" | "wifi" | "edit" | "codepen" | "gitlab" | "youtube" | "twitter" | "dribbble" | "instagram" | "slack" | "align-left" | "align-right" | "archive" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "battery" | "bell" | "bookmark" | "box" | "briefcase" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "circle" | "clipboard" | "clock" | "code" | "compass" | "copy" | "credit-card" | "crop" | "facebook" | "feather" | "folder" | "globe" | "grid" | "layers" | "linkedin" | "list" | "log-out" | "map" | "mic" | "moon" | "mouse-pointer" | "music" | "pie-chart" | "rss" | "scissors" | "share" | "shield" | "shopping-bag" | "shopping-cart" | "shuffle" | "tablet" | "thermometer" | "thumbs-down" | "thumbs-up" | "trash" | "tv" | "users" | "video" | "voicemail" | "external-link" | "activity" | "airplay" | "alert-circle" | "alert-octagon" | "alert-triangle" | "align-center" | "align-justify" | "anchor" | "aperture" | "arrow-down-circle" | "arrow-down-left" | "arrow-down-right" | "arrow-left-circle" | "arrow-right-circle" | "arrow-up-circle" | "arrow-up-left" | "arrow-up-right" | "at-sign" | "award" | "bar-chart" | "bar-chart-2" | "battery-charging" | "bell-off" | "bluetooth" | "bold" | "book-open" | "camera-off" | "cast" | "check-circle" | "check-square" | "chevrons-down" | "chevrons-left" | "chevrons-right" | "chevrons-up" | "cloud-drizzle" | "cloud-lightning" | "cloud-off" | "cloud-rain" | "cloud-snow" | "codesandbox" | "coffee" | "columns" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "cpu" | "crosshair" | "disc" | "divide" | "divide-circle" | "divide-square" | "dollar-sign" | "download-cloud" | "droplet" | "edit-2" | "edit-3" | "eye-off" | "fast-forward" | "figma" | "file" | "file-minus" | "file-plus" | "file-text" | "film" | "folder-minus" | "folder-plus" | "framer" | "git-branch" | "git-commit" | "git-merge" | "git-pull-request" | "hard-drive" | "hash" | "headphones" | "help-circle" | "hexagon" | "italic" | "life-buoy" | "link-2" | "loader" | "log-in" | "map-pin" | "maximize" | "maximize-2" | "message-circle" | "message-square" | "mic-off" | "minimize" | "minimize-2" | "minus-circle" | "minus-square" | "monitor" | "more-horizontal" | "more-vertical" | "move" | "navigation" | "navigation-2" | "octagon" | "package" | "pause-circle" | "pen-tool" | "percent" | "phone-call" | "phone-forwarded" | "phone-incoming" | "phone-missed" | "phone-off" | "phone-outgoing" | "play-circle" | "plus-circle" | "plus-square" | "pocket" | "power" | "refresh-ccw" | "refresh-cw" | "repeat" | "rewind" | "rotate-ccw" | "rotate-cw" | "send" | "server" | "settings" | "share-2" | "shield-off" | "sidebar" | "skip-back" | "skip-forward" | "slash" | "sliders" | "smartphone" | "smile" | "speaker" | "square" | "stop-circle" | "sun" | "sunrise" | "sunset" | "target" | "terminal" | "toggle-left" | "toggle-right" | "trash-2" | "trello" | "trending-down" | "trending-up" | "triangle" | "truck" | "twitch" | "type" | "umbrella" | "underline" | "upload-cloud" | "user-check" | "user-minus" | "user-plus" | "user-x" | "video-off" | "volume" | "volume-1" | "volume-2" | "volume-x" | "watch" | "wifi-off" | "wind" | "x" | "x-circle" | "x-octagon" | "x-square" | "zap" | "zap-off" | "zoom-in" | "zoom-out", "feather";
declare type OnBoardingScreenProps = {
    SVG: React.FC;
    title: string;
    imageSource: ImageSourcePropType;
    subtitle: string;
    classname?: string
}

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    fullyRounded?: boolean
}

declare interface CheckboxProps {
    label?: string;
    checked: boolean;
    onPress: () => void;
    containerStyle?: string;
    labelStyle?: string;
    checkedColor?: string;
}

declare interface SwiperProps<T> extends FlatListProps<T> {
}

declare interface DropdownProps {
    options: Array<{ label: string; value: any }>;
    onSelect: (value: any) => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    dropdownStyle?: StyleProp<ViewStyle>;
    optionStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    activeOpacity?: number;
    disabled?: boolean;
    IconRight?: React.JSX.Element;
    IconLeft?: React.JSX.Element;
    containerClassName?: string;
}

declare interface TruckOptionProps {
    title: string;
    loadLimit: string;
    price: string;
    TruckImage: React.JSX.Element;
}

declare interface InformationItem {
    title: string;
    value: string;
    editable: boolean;
    type: "text";
}

declare interface InformationActionItem {
    title: string;
    Icon: IconNames;
    action: () => void;
    type: "action";
    themeColor?: string;
}

declare interface AnimatedPressableProps extends PressableProps {
    children: React.ReactNode,
    className?: string,
    activeOpacity?: number,
    containerClassName?: string
}

declare interface InvoiceCardProps {
    id: string,
    date: Date,
    amount: string,
    status: "Paid" | "Pending" | "Cancelled" | "Failed"
}

declare interface CartItemProps {
    title: string;
    price: number;
    quantity: number;
    image: ImageSourcePropType;
    isLast?: boolean;
}

declare interface LocationState {
    address: string | null;
    setAddress: (address: string | null) => void;
    latitude: number | null;
    setLatitude: (latitude: number | null) => void;
    longitude: number | null;
    setLongitude: (longitude: number | null) => void;
    hasLocationPermission: boolean;
    setHasLocationPermission: (hasLocationPermission: boolean) => void;
}

declare interface Storage {
    name: string;
    location?: {
        latitude: number;
        longitude: number;
    };
}

declare interface StorageState {
    storages: Storage[];
    setStorages: (storages: Storage[]) => void;
}

declare type Endpoints = `/${string}`;

declare interface BaseSignUp {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

declare interface SocialSignUp extends Omit<BaseSignUp, "password" | "password_confirmation"> {
    provider: 'google' | 'facebook' | 'apple';
    provider_id: string;
}

declare interface ActiveUser {
    id: number;
    full_name: string;
    username: string;
    email: string;
    email_verified_at?: string;
    role: "customer";
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    profile: ActiveUserProfile;
    bookings: [];
}

declare interface UnAuthenticatedStore {
    isSignedIn: false;
    activeUser: null;
    error: string[];
    activeId: "";
    updatingUser: boolean;
    signUp: (payload: BaseSignUp | SocialSignUp) => Promise<boolean>;
    signIn: (payload: Pick<BaseSignUp, "email" | "password">) => Promise<boolean>;
    signOut: (activeId: string) => Promise<void>;
    clearError: () => void;
    updateUser: (activeId: string) => Promise<void>;
    updateProfilePhoto: (formData: FormData, activeId: string) => Promise<void>
}

declare interface AuthenticatedStore extends UnAuthenticatedStore {
    isSignedIn: true;
    activeUser: ActiveUser;
    activeId: string;
    error: string[];
}

declare interface SignUpErrorResponse {
    success: false;
    errors: {
        email?: string[];
        name?: string[];
        password?: string[];
    };
    status: 422;
}

declare interface SignUpSuccessResponse {
    user: ActiveUser;
    profile: null;
    success: true;
    token: string;
    status: 200;
}

declare interface ActiveUserProfile {
    photo: string | null;
    phone: string;
    address: string;
    country: string;
}


declare interface LoginSuccessResponse {
    user: ActiveUser;
    profile: ActiveUserProfile | null;
    success: true;
    token: string;
    status: 200;
}

declare interface LoginErrorResponse {
    success: false;
    errors: string;
    status: 422;
}

declare interface UpdateProfilePhotoSuccessResponse {
    data: {
        success: true,
        message: string,
        photo_url: string
    }
}
declare interface UpdateProfilePhotoErrorResponse extends Omit<UpdateProfilePhotoResponse, "photo_url"> {
    data: undefined
    success: false,
    error: string
}

declare interface CreateProfileErrorResponse {
    
}
declare interface CreateProfileSuccessResponse {
    success: true,
    profile: {
        id: number,
        photo: null,
        phone: string,
        address: string,
        country: string,
        user_id: number,
        created_at: string,
        updated_at: string
    },
    status: 200
}