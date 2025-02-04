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
import { useSpecificStorage } from '@/store/Public/Public Storage Feed Endpoints/specificStorage';
import { useEffect } from 'react';
import LoadingShimmer from '@/components/general sub components/LoadingShimmer';

export default function Coldstorage() {
    const { id } = useLocalSearchParams<{ id: string; }>();
    const { load_hub, loading, distance, capacity, name } = useSpecificStorage();

    useEffect(() => {
        if (!id) return;

        (async () => {
            await load_hub(Number(id));
        })()
    }, [id]);

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
                        {loading && <LoadingShimmer
                            compHeight={10}
                            compWidth={"100%"}
                            borderRadius={0}
                            style={{}}
                            shimmerWidth={362}
                            shimmerDuration={1000}
                        />}
                        {!loading && <>
                            <InfoPill title={`${distance} KM`} />
                            <InfoPill title={`Capacity: ${capacity} Tons`} />
                        </>}
                    </View>
                    <HubDetails />
                    {!loading && <ActionTray />}
                    <SuggestedHubs />
                    <View className='h-24'></View>
                </ScrollView>
            </InformationSheet>
            <ActionSheet selectedHub={name} />
        </View>
    )
}