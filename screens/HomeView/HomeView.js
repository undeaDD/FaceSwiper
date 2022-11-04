import { useRef, useEffect, useState } from "react";
import ViewShot from "react-native-view-shot";
import { FlatList, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import ShareScreenshotImage from "./../../assets/share.png";
import { useTheme } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';

export const HomeViewOptions = {
    title: "FaceSwiper",
}

const Swiper = ({items, number}) => {
    const { width } = useWindowDimensions();

    return (
        <FlatList 
            data={items}
            keyExtractor={item => item.id}
            horizontal={true}
            pagingEnabled={true}
            renderItem={(item) => renderItem(item, width, number)}
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

const renderItem = ({item}, width, number) => {
    return (
        <Image 
            source={{
                uri: "https://undeadd.github.io/FaceSwiper/faces/" + item.id +  ".jpg?date=" + new Date(),
                cache: "reload"
            }}
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
    const { colors } = useTheme();
    const [ array, setArray ] = useState([]);
    const viewShotRef = useRef();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{height: 26, width: 26}}
                    activeOpacity={0.5}
                    onPress={() => {
                        fetch("https://undeadd.github.io/FaceSwiper/count.json").then((response) => {
                            let text = response.text();
                            if (Number(text)) {
                                setArray([...Array(Number(text)).keys()]);
                            } else {
                                console.log("error number", text);
                            }
                        });
                    }}
                >
                    <Image
                        source={ShareScreenshotImage}
                        style={{height: 26, width: 26, tintColor: colors.primary}}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{height: 26, width: 26}}
                    activeOpacity={0.5}
                    onPress={() => {
                        viewShotRef.current.capture().then((uri) => {
                            Sharing.shareAsync("file://" + uri, {
                                UTI: "public.jpeg",
                                dialogTitle: "Screenshot teilen",
                                mimeType: "image/jpeg"
                            })
                        });
                    }}
                >
                    <Image
                        source={ShareScreenshotImage}
                        style={{height: 26, width: 26, tintColor: colors.primary}}
                    />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <ViewShot style={{flex: 1}} ref={viewShotRef} options={{ fileName: "Face", format: "jpg", quality: 0.9 }} >
            <Swiper items={array} number={0} />
            <Swiper items={array} number={1} />
            <Swiper items={array} number={2} />
            <Swiper items={array} number={3} />
            <Swiper items={array} number={4} />
        </ViewShot>
    );
}