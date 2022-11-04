import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsView, { SettingsViewOptions } from "./SettingsView";
import SettingsImage from "./../../assets/settings.png";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();

export const SettingsStackOptions = {
    headerShown: false,
    tabBarLabel: "Einstellungen",
    tabBarIcon: ({ color }) => (
    	<Image source={SettingsImage} style={{width: 26, height: 26, tintColor: color}} />
    ),
}

export default SettingsStack = () => {
    return (
		<Stack.Navigator>
            <Stack.Screen name="SettingsView" component={SettingsView} options={SettingsViewOptions}/>
        </Stack.Navigator>
    );
}