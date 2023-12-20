import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import Timer from './Timer'

export default function Main({ navigation }) {
	const toNote = () => {
		navigation.navigate('Notes')
	}

	const toSettings = () => {
		navigation.navigate('Settings')
	}

	return (
		<View>
			<Timer />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
