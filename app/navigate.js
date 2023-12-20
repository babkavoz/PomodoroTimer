import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import Main from './components/Main'
import Settings from './components/Settings'
import Notes from './components/Notes'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { constants } from './gstyles'

const Stack = createStackNavigator()

export default function Navigate() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: constants.primaryColor,
					},
					headerTintColor: 'white', // Установите цвет текста в шапке
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: 'bold'
					}
				}}
			>
				<Stack.Screen
					name='Main'
					component={Main}
					options={({ navigation }) => ({
						title: 'Главная',
						headerRight: () => (
							<TouchableOpacity
								style={styles.iconButton}
								onPress={() => {
									navigation.navigate('Settings')
								}}
							>
								<MaterialIcons name='settings' size={24} color='white' />
							</TouchableOpacity>
						),
						headerLeft: () => (
							<TouchableOpacity
								style={styles.iconButton}
								onPress={() => {
									navigation.navigate('Notes')
								}}
							>
								<MaterialIcons name='assignment' size={24} color='white' />
							</TouchableOpacity>
						)
					})}
				/>
				<Stack.Screen
					name='Settings'
					component={Settings}
					options={{ title: 'Настройки' }}
				/>
				<Stack.Screen
					name='Notes'
					component={Notes}
					options={{ title: 'Notes' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'red',
		color: 'red'
	},
	iconButton: {
		padding: 10
	}
})
