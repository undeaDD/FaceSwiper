import { useRef, useEffect, useState } from "react";
import ViewShot from "react-native-view-shot";
import { FlatList, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import ShareScreenshotImage from "./../../assets/share.png";
import ReloadImage from "./../../assets/reload.png";
import { useTheme } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';

export const HomeViewOptions = {
    title: "FaceSwiper",
}

export default HomeView = ({ navigation }) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const [ array, setArray ] = useState([]);
    const viewShotRef = useRef();

    const Swiper = ({items, number}) => {
        return (
            <FlatList
                data={items}
                keyExtractor={(_item, index) => number.toString() + (index +  1).toString()}
                horizontal={true}
                pagingEnabled={true}
                renderItem={({_item, index}) => renderItem(number.toString() + (index +  1).toString())}
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

    const renderItem = (id) => {
        return (
            <Image 
                source={{
                    uri: Constants.manifest.extra.baseURL + "/faces/" + id +  ".jpg?date=" + new Date(),
                    cache: "reload"
                }}
                style={{
                    width: width,
                    height: "100%",
                    backgroundColor: colors.card,
                    resizeMode: "stretch"
                }} 
            />
        );
    }

    const reloadData = () => {
        fetch(Constants.manifest.extra.baseURL + "/count.json")
            .then((response) => response.json())
            .then(response => {
                if (Number(response)) {
                    let array = [...Array(Number(response)).keys()];
                    setArray(array);
                } else {
                    setArray([]);
                }
            }).catch(_error => {
                setArray([]);
            });
    }

    useEffect(() => {
        reloadData();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{height: 26, width: 26}}
                    activeOpacity={0.5}
                    onPress={reloadData}
                >
                    <Image
                        source={ReloadImage}
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
            <Swiper items={array} number={1} />
            <Swiper items={array} number={2} />
            <Swiper items={array} number={3} />
            <Swiper items={array} number={4} />
            <Swiper items={array} number={5} />
        </ViewShot>
    );
}