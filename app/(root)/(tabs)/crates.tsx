import CrateView from '@/components/Crates/CrateView';
import Header from '@/components/Crates/Header';
import Options from '@/components/Crates/Options';
import ActionSheet from '@/components/general sub components/ActionSheet';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Crates() {
    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle={"dark-content"} />
            <Header />
            <ScrollView className='flex-1'>
                <CrateView />
                <Options />
                <View className='h-36' />
            </ScrollView>
            <ActionSheet
                action={() => { }}
                actionText='Add to Cart'
                value={2700}
            />
        </SafeAreaView>
    )
}