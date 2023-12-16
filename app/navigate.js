import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import Main from './components/Main'
import Settings from './components/Settings'
import Account from './components/Account'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Main'
					component={Main}
					options={({ navigation }) => ({
						title: 'Главная',
						headerRight: () => (
							<TouchableOpacity
								style={styles.iconButton}
								onPress={() => {
									console.log('Settings button pressed!')
									navigation.navigate('Settings')
								}}
							>
								<MaterialIcons name='settings' size={24} color='black' />
							</TouchableOpacity>
						),
						headerLeft: () => (
							<TouchableOpacity
								style={styles.iconButton}
								onPress={() => {
									console.log('Account button pressed!')
									navigation.navigate('Account')
								}}
							>
								<MaterialIcons name='person' size={24} color='black' />
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
					name='Account'
					component={Account}
					options={{ title: 'Аккаунт' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	iconButton: {
		padding: 10
	}
})
