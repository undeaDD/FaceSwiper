import { SyncedScrollView } from "./SyncedScrollView";
import { View, Text, Animated } from "react-native";
import { createContext } from 'react';

export const SyncedScrollSection = (props) => {
    const syncedScrollViewState = {
        activeScrollView: new Animated.Value(0),
        offsetPercent: new Animated.Value(0)
    }

    const data = [
        {id: '1'},
        {id: '2'},
        {id: '3'},
        {id: '4'},
        {id: '5'}
    ];

    const renderScrollItem = ({ item }) => {
        return <View style={{height: props.fifth, width: props.width, backgroundColor: "transparent"}}></View>
    }

    const renderItem = ({ item }) => (
        <View pointerEvents="none" style={{height: props.height, width: props.width, justifyContent: "center", alignItems: "center"}}><Text>{item.id}</Text></View>
    );

    const SyncedScrollViewContext = createContext(syncedScrollViewState);

    return (
        <SyncedScrollViewContext.Provider value={syncedScrollViewState} style={{flex: 1}}>
            <SyncedScrollView
                id={1 + props.id}
                data={data}
                context={SyncedScrollViewContext}
                pointerEvents="none"
                renderItem={renderItem}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={props.width}
                style={{position: "absolute", height: props.height, width: props.width, backgroundColor: "transparent", zIndex: 2, elevation: 2}}
                keyExtractor={item => item.id}
            />
            <SyncedScrollView
                id={5 + props.id}
                data={data}
                context={SyncedScrollViewContext}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={props.width}
                style={{flexGrow: 0, height: props.fifth, width: props.width, backgroundColor: "transparent", zIndex: 1, elevation: 1}}
                renderItem={renderScrollItem}
                keyExtractor={item => item.id}
            />
        </SyncedScrollViewContext.Provider>
    );
}