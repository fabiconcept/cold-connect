import CrateView from '@/components/Crates/CrateView';
import Header from '@/components/Crates/Header';
import Options from '@/components/Crates/Options';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Crates() {
    return (
        <SafeAreaView className='flex-1'>
            <ScrollView>
                <StatusBar barStyle={"dark-content"} />
                <Header />
                <CrateView />
                <Options />
            </ScrollView>
        </SafeAreaView>
    )
}