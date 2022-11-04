import { useRef, useEffect } from "react";
import ViewShot from "react-native-view-shot";
import { FlatList, useWindowDimensions, Image, Button } from 'react-native';

export const HomeViewOptions = {
    title: "FaceSwiper",
}

const data = [
    [
        {id: "0", image: require("./../../assets/faces/11.jpg")},
        {id: "1", image: require("./../../assets/faces/21.jpg")},
        {id: "2", image: require("./../../assets/faces/31.jpg")},
        {id: "3", image: require("./../../assets/faces/41.jpg")},
        {id: "4", image: require("./../../assets/faces/51.jpg")},
    ],
    [
        {id: "0", image: require("./../../assets/faces/12.jpg")},
        {id: "1", image: require("./../../assets/faces/22.jpg")},
        {id: "2", image: require("./../../assets/faces/32.jpg")},
        {id: "3", image: require("./../../assets/faces/42.jpg")},
        {id: "4", image: require("./../../assets/faces/52.jpg")},
    ],
    [
        {id: "0", image: require("./../../assets/faces/13.jpg")},
        {id: "1", image: require("./../../assets/faces/23.jpg")},
        {id: "2", image: require("./../../assets/faces/33.jpg")},
        {id: "3", image: require("./../../assets/faces/43.jpg")},
        {id: "4", image: require("./../../assets/faces/53.jpg")},
    ]
];

const Swiper = ({items, number}) => {
    const { width } = useWindowDimensions();
    return (
        <FlatList 
            data={items[number]}
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
        <Image 
            source={item.image}
            style={{
                width: width,
                height: "100%",
                backgroundColor: item.color,
                resizeMode: "stretch"
            }} 
        />
    );
}

export default HomeView = ({ navigation }) => {
    const ref = useRef();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => ref.current.capture()} title="Snap" />
            ),
        });
    }, [navigation]);

    return (
        <ViewShot style={{flex: 1}} ref={ref} options={{ fileName: "Face", format: "jpg", quality: 0.9 }} >
            <Swiper items={data} number={0} />
            <Swiper items={data} number={1} />
            <Swiper items={data} number={2} />
        </ViewShot>
    );
}