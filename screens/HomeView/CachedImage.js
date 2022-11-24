import React, { useState, useEffect } from "react";
import { cacheDirectory, getInfoAsync, downloadAsync } from "expo-file-system";
import Constants from "expo-constants";
import { ActivityIndicator, Image, View } from "react-native";

export default CachedImage = (props) => {
    const {id, style} = props;
    const [uri, setUri] = useState(null);
    
    useEffect(() => {
        const cacheImage = async () => {
            const localFile = cacheDirectory + "faces/" + id + ".jpg";
            const externalFile = Constants.manifest.extra.baseURL + "/faces/" + id + ".jpg";
            const image = await getInfoAsync(localFile).catch(() => {console.log("error get info");});            

            if (image.exists) {
                setUri(image.uri);
            } else {
                const newImage = await downloadAsync(externalFile, localFile).catch(() => {console.log("error download image");});
                setUri(newImage.uri);
            }
        };
        
        cacheImage().catch(() => {console.log("error caching image");});
    }, []);
    
    if (uri) {
        return (
            <Image 
                source={{
                    uri: uri,
                }}
                style={style}
            />
        );
    } else {
        return (
            <View style={style} >
                <ActivityIndicator style={{flex: 1}} size={"small"} color={"#7C7C7D"}/> 
            </View>
        );
    }
}