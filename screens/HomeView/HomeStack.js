import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView, { HomeViewOptions } from "./HomeView";

const Stack = createNativeStackNavigator();

export const HomeStackOptions = {
    headerShown: false,
    tabBarLabel: "Home",
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="face-man" color={color} size={26} />
    ),
}

export default HomeStack = () => {
    return (
		<Stack.Navigator>
            <Stack.Screen name="HomeView" component={HomeView} options={HomeViewOptions}/>
        </Stack.Navigator>
    );
}