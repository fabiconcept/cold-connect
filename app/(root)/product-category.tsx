import Header from '@/components/Product Category/Single/Header';
import Grid from '@/components/Product Category/Single/Grid';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductCategory() {
    return (
        <SafeAreaView>
            <Header />
            <Grid />
        </SafeAreaView>
    )
}