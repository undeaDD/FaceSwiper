import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsView, { SettingsViewOptions } from "./SettingsView";

const Stack = createNativeStackNavigator();

export const SettingsStackOptions = {
    headerShown: false,
    tabBarLabel: "Home",
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="cog" color={color} size={26} />
    ),
}

export default SettingsStack = () => {
    return (
		<Stack.Navigator>
            <Stack.Screen name="SettingsView" component={SettingsView} options={SettingsViewOptions}/>
        </Stack.Navigator>
    );
}