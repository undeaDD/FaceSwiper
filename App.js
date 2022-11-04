import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import TabView from './screens/TabView/TabView';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	const scheme = useColorScheme();

  	return (
		<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} >
        	<TabView />
			<StatusBar />
    	</NavigationContainer>
  	);
}