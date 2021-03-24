import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import * as React from 'react';
import SetupScreen from '../screens/SetupScreen';
import FormScreen from '../screens/FormScreen';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
	let colorScheme = useColorScheme();
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors[colorScheme].background,
					borderBottomWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
				},
				headerTitleStyle: {
					marginLeft: 8,
				},
			}}
		>
			<Stack.Screen name='SetupScreen' component={SetupScreen} options={{ headerTitle: 'Setup' }} />
			<Stack.Screen name='FormScreen' component={FormScreen} options={{ headerTitle: 'Form' }} />
		</Stack.Navigator>
	);
}
