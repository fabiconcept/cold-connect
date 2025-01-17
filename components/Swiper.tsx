import { SwiperProps } from '@/types/types';
import { View, Text, FlatList } from 'react-native';

export default function Swiper<T>(props: SwiperProps<T>) {

    return (
        <FlatList
            data={props.data}
            renderItem={props.renderItem}
            keyExtractor={props.keyExtractor}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    )
}