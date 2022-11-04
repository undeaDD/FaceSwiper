import { FlatList, View, useWindowDimensions } from 'react-native';

export const HomeViewOptions = {
    title: "FaceSwiper",
}

const data = [
    {id: "0", color: "red"},
    {id: "1", color: "green"},
    {id: "2", color: "blue"},
    {id: "3", color: "orange"},
    {id: "4", color: "gray"},
    {id: "5", color: "black"},
    {id: "6", color: "purple"},
    {id: "7", color: "yellow"},
];

const Swiper = ({items}) => {
    const { width } = useWindowDimensions();

    return (
        <FlatList 
            data={items}
            keyExtractor={item => item.id}
            horizontal={true}
            pagingEnabled={true}
            renderItem={(item) => renderItem(item, width)}
            style={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={true}
            decelerationRate={"fast"}
            initialNumToRender={1}
            removeClippedSubviews={true}
            contentContainerStyle={{flexGrow: 1}}
        />
    );
}

const renderItem = ({item}, width) => {
    return (
        <View style={{width: width, height: "100%", backgroundColor: item.color}}></View>
    );
}

export default HomeView = () => {
    
    return (
        <View style={{flex: 1}}>
            <Swiper items={data} />
            <Swiper items={data} />
            <Swiper items={data} />
        </View>
    );
}