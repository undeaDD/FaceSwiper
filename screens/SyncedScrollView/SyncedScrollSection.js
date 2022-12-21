import { SyncedScrollView } from "./SyncedScrollView";
import { useTheme } from "@react-navigation/native";
import { View, Text, Animated } from "react-native";
import { createContext } from 'react';
import CachedImage from "./CachedImage";

export const SyncedScrollSection = (props) => {
    const syncedScrollViewState = {
        activeScrollView: new Animated.Value(0),
        offsetPercent: new Animated.Value(0)
    }

    const renderScrollItem = ({ _item }) => {
        return <View style={{height: props.fifth, width: props.width, backgroundColor: "transparent"}}></View>
    }

    const renderItem = ({ item, index }) => {
        return (
            <CachedImage
                id={(props.id + 1).toString() + (index + 1).toString()}
                style={{
                    width: props.width,
                    height: props.height,
                    resizeMode: "stretch",
                    tintColor: colors.text
                }}
                pointerEvents="none"
            />
        )
    };

    const SyncedScrollViewContext = createContext(syncedScrollViewState);
    const { colors } = useTheme();

    return (
        <SyncedScrollViewContext.Provider value={syncedScrollViewState} style={{flex: 1}}>
            <SyncedScrollView
                id={1 + props.id}
                data={props.data}
                extraData={props.extraData}
                context={SyncedScrollViewContext}
                pointerEvents="none"
                renderItem={renderItem}
                snapToInterval={props.width}
                style={{position: "absolute", height: props.height, width: props.width, backgroundColor: "transparent", position: "absolute", top: 0, left: 0, zIndex: 0}}
                keyExtractor={(_item, index) => index.toString()}
            />
            <SyncedScrollView
                id={5 + props.id}
                data={props.data}
                extraData={props.extraData}
                context={SyncedScrollViewContext}
                snapToInterval={props.width}
                style={{flexGrow: 0, height: props.fifth, width: props.width, backgroundColor: "transparent", zIndex: 1}}
                renderItem={renderScrollItem}
                keyExtractor={(_item, index) => index.toString()}
            />
        </SyncedScrollViewContext.Provider>
    );
}