import { useRef, useEffect, useState } from "react";
import ViewShot from "react-native-view-shot";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useWindowDimensions, TouchableOpacity, Image, View, Text } from "react-native";
import { SyncedScrollSection } from "./../SyncedScrollView/SyncedScrollSection";
import { deleteAsync, cacheDirectory, makeDirectoryAsync } from "expo-file-system";
import ShareScreenshotImage from "./../../assets/share.png";
import ReloadImage from "./../../assets/reload.png";
import { useTheme } from "@react-navigation/native";
import { shareAsync } from "expo-sharing";
import Constants from "expo-constants";

export const HomeViewOptions = {
    title: "FaceSwiper",
}

export default HomeView = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const tabHeight = useBottomTabBarHeight();
    const headerHeight = useHeaderHeight();

    const cardHeight = height - tabHeight - headerHeight;
    const fifth = cardHeight / 5.0;

    const viewShotRef = useRef();
    const [ array, setArray ] = useState([]);
    const { colors } = useTheme();

    const Overlay = () => {
        return (
            <View pointerEvents="none" style={{height: "100%", width: "100%", position: "absolute"}}>
                <Image source={require("./../../assets/eyelashes.png")} style={{height: fifth, width: 20, paddingLeft: 5, tintColor: "gray", resizeMode: "contain", borderColor: "gray", borderBottomWidth: 1}} />
                <Image source={require("./../../assets/eye.png")} style={{height: fifth, width: 20, paddingLeft: 5, tintColor: "gray", resizeMode: "contain", borderColor: "gray", borderBottomWidth: 1}} />
                <Image source={require("./../../assets/nose.png")} style={{height: fifth, width: 20, paddingLeft: 5, tintColor: "gray", resizeMode: "contain", borderColor: "gray", borderBottomWidth: 1}} />
                <Image source={require("./../../assets/mouth.png")} style={{height: fifth, width: 20, paddingLeft: 5, tintColor: "gray", resizeMode: "contain", borderColor: "gray", borderBottomWidth: 1}} />
                <Image source={require("./../../assets/face.png")} style={{height: fifth, width: 20, paddingLeft: 5, tintColor: "gray", resizeMode: "contain"}} />
            </View>
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
                console.log(array);
            }).catch(_error => {
                setArray([]);
                console.log(array);
            });
    }

    useEffect(() => {
        console.log("reload data")
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
        <View style={{flex: 1}} >
            <ViewShot style={{flex: 1}} ref={viewShotRef} options={{ fileName: "Face", format: "jpeg", quality: 1.0 }} >
                <SyncedScrollSection id={0} fifth={fifth} width={width} height={cardHeight} data={array} />
                <SyncedScrollSection id={1} fifth={fifth} width={width} height={cardHeight} data={array} />
                <SyncedScrollSection id={2} fifth={fifth} width={width} height={cardHeight} data={array} />
                <SyncedScrollSection id={3} fifth={fifth} width={width} height={cardHeight} data={array} />
                <SyncedScrollSection id={4} fifth={fifth} width={width} height={cardHeight} data={array} />
            </ViewShot>
            <Overlay />
        </View>
    );
}