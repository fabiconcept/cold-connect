import ActionTray from '@/components/cold-storage/ActionTray';
import Header from '@/components/cold-storage/Header';
import HubDetails from '@/components/cold-storage/HubDetails';
import InfoPill from '@/components/general sub components/InfoPill';
import InformationSheet from '@/components/general sub components/InformationSheet';
import StoragePhoto from '@/components/cold-storage/StoragePhoto';
import SuggestedHubs from '@/components/cold-storage/SuggestedHubs';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from '@/components/cold-storage/ActionSheet';

export default function Coldstorage() {
    const { id } = useLocalSearchParams();

    return (
        <View className='flex-1'>
            <StoragePhoto />
            <Header />
            <InformationSheet
                className='pb-10'
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className='flex-1'
                >
                    <View className='flex-row gap-1 px-2'>
                        <InfoPill title='00 KM' />
                        <InfoPill title='Capacity: 100 Tons' />
                    </View>
                    <HubDetails />
                    <ActionTray />
                    <SuggestedHubs />
                    <View className='h-24'></View>
                </ScrollView>
            </InformationSheet>
            <ActionSheet />
        </View>
    )
}