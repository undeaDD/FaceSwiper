import { useRef, useEffect, useState } from "react";
import ViewShot from "react-native-view-shot";
import { FlatList, useWindowDimensions, TouchableOpacity, Image } from "react-native";
import { deleteAsync, cacheDirectory, makeDirectoryAsync } from "expo-file-system";
import ShareScreenshotImage from "./../../assets/share.png";
import ReloadImage from "./../../assets/reload.png";
import { useTheme } from "@react-navigation/native";
import { shareAsync } from "expo-sharing";
import CachedImage from "./CachedImage";
import Constants from "expo-constants";

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
                renderItem={({index}) => renderItem(number.toString() + (index +  1).toString())}
                style={{flex: 1, overflow: "visible", zIndex: 10 - number}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                alwaysBounceHorizontal={true}
                decelerationRate={"fast"}
                initialNumToRender={1}
                removeClippedSubviews={true}
                contentContainerStyle={{flexGrow: 1}}
                windowSize={3}
            />
        );
    }

    const renderItem = (id) => {
        return (
            <CachedImage 
                id={id}
                style={{
                    width: width,
                    height: "500%",
                    backgroundColor: "transparent",
                    resizeMode: "stretch"
                }} 
            />
        );
    }

    const reloadData = async (removeCache) => {
        if (removeCache) {
            await deleteAsync(cacheDirectory + "faces/", {idempotent: true});
        }

        await makeDirectoryAsync(cacheDirectory + "faces/", {intermediates: true}).catch(() => {console.log("error create folder");});       

        fetch(Constants.manifest.extra.baseURL + "/count.json")
            .then((response) => response.json())
            .then(response => {
                setArray(Number(response) ? [...Array(Number(response)).keys()] : []);
            }).catch(_error => {
                setArray([]);
            });
    }

    useEffect(() => {
        reloadData(false);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{height: 26, width: 26}}
                    activeOpacity={0.5}
                    onPress={() => reloadData(true)}
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
                            shareAsync("file://" + uri, {
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