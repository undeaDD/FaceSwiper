import { useTheme } from '@react-navigation/native';
import { FlatList, View,useWindowDimensions, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ChevronImage from "./../../assets/chevron.png";
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import Constants from 'expo-constants';

export const SettingsViewOptions = {
    title: "Einstellungen",
}

export default SettingsView = () => {
    const { width } = useWindowDimensions();
    const { colors } = useTheme();

    const browserOptions = {
        presentationStyle: "pageSheet",
        createTask: false,
        dismissButtonStyle: "close",
        enableBarCollapsing: true,
        enableDefaultShareMenuItem: false,
        readerMode: false,
        showInRecents: false,
        showTitle: false
    };

    const items = [
        //{id: "1", cellType: 1, contentType: 0, text: "Bilder URL", placeholder: "https://www.google.de/", keyboard: "url"},
        //{id: "2", cellType: 2, contentType: 0, text: "Anzahl Bilder", placeholder: "3", keyboard: "number-pad"},
    
        //{id: "3", cellType: 0},
    
        {id: "4", cellType: 1, contentType: 1, text: "Homepage öffnen", onPress: () => { 
            openBrowserAsync(Constants.manifest.extra.homepageURL, browserOptions);
        }},
        {id: "5", cellType: 3, contentType: 1, text: "Impressum anzeigen", onPress: () => { 
            openBrowserAsync(Constants.manifest.extra.imprintURL, browserOptions);
        }},
        {id: "6", cellType: 2, contentType: 1, text: "Lizenzen anzeigen", onPress: () => { 
            openBrowserAsync(Constants.manifest.extra.licensesURL, browserOptions);
        }}
    ];
    
    const renderItem = ({item}, width, colors) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                disabled={item.contentType !== 1}
                onPress={item.onPress}
                style={{
                    marginHorizontal: 20,
                    width: width - 40,
                    height: item.cellType === 0 ? 20 : 50,
                    backgroundColor: item.cellType === 0 ? colors.backgroundColor : colors.card,
                    borderTopStartRadius: item.cellType === 1 ? 10 : 0,
                    borderTopEndRadius: item.cellType === 1 ? 10 : 0,
                    borderBottomStartRadius: item.cellType === 2 ? 10 : 0,
                    borderBottomEndRadius: item.cellType === 2 ? 10 : 0
                }}
            >
                { item.contentType === 0 &&
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text
                            numberOfLines={1} 
                            style={{height: 50, width: "28%", color: colors.primary, lineHeight: 50, marginLeft: "8%"}}
                        >
                            {item.text}
                        </Text>
                        <TextInput
                            numberOfLines={1}
                            multiline={false}
                            style={{height: 50, width: "40%", textAlign: "right", marginLeft: "16%", marginRight: "8%", color: colors.text, textAlignVertical: "center"}}
                            placeholder={item.placeholder}
                            keyboardType={item.keyboard}
                        />
                    </View>
                }
    
                { item.contentType === 1 &&
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <Text 
                            style={{flex: 1, color: colors.primary, lineHeight: 50, marginLeft: "8%"}}
                        >
                            {item.text}
                        </Text>
                        <Image source={ChevronImage} style={{height: 50, width: 15, resizeMode: "contain", tintColor: colors.primary, marginRight: "8%"}} />
                    </View>
                }
            </TouchableOpacity>
        );
    }

    return (
        <FlatList 
            data={items}
            keyExtractor={item => item.id}
            renderItem={(item) => renderItem(item, width, colors)}
            style={{flex: 1}}
            showsVerticalScrollIndicator={true}
            alwaysBounceVertical={true}
            decelerationRate={"fast"}
            removeClippedSubviews={true}
            contentContainerStyle={{paddingVertical: 20}}
        />
    );
}