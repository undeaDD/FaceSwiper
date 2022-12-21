import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView, { HomeViewOptions } from "./HomeView";
import HomeImage from "./../../assets/home.png";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();

export const HomeStackOptions = {
    headerShown: false,
    tabBarLabel: "FaceSwiper",
    tabBarIcon: ({ color }) => (
    	<Image source={HomeImage} style={{width: 26, height: 26, tintColor: color}} />
    ),
}

export default HomeStack = () => {
    return (
		<Stack.Navigator screenOptions={{headerTitleAlign: "center"}}>
            <Stack.Screen name="HomeView" component={HomeView} options={HomeViewOptions}/>
        </Stack.Navigator>
    );
}