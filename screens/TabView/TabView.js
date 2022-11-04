import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack, { HomeStackOptions } from './../HomeView/HomeStack';
import SettingsStack, { SettingsStackOptions } from './../SettingsView/SettingsStack';

const Tab = createBottomTabNavigator();

export default TabView = () => {
    return (
		<Tab.Navigator>
            <Tab.Screen name="HomeStack" component={HomeStack} options={HomeStackOptions} />
            <Tab.Screen name="SettingsStack" component={SettingsStack} options={SettingsStackOptions} />
        </Tab.Navigator>
    );
}