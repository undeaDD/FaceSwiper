import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { enableFreeze, enableScreens } from "react-native-screens";
import { useColorScheme, LogBox } from 'react-native';
import TabView from './screens/TabView/TabView';
import { StatusBar } from 'expo-status-bar';

LogBox.ignoreAllLogs();
enableScreens(true);
enableFreeze(true);

if (!__DEV__) {
	// Kill logging in production
	console.warn = function () {};
	console.error = function () {};
	console.log = function () {};
}

export default function App() {
	const scheme = useColorScheme();

  	return (
		<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} >
        	<TabView />
			<StatusBar />
    	</NavigationContainer>
  	);
}