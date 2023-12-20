import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

export default function ListItem({ el, deleteHandler }) {
	return (
		<View>
			<TouchableWithoutFeedback onPress={() => deleteHandler(el.key)}>
				<Text style={styles.text}>{el.text}</Text>
			</TouchableWithoutFeedback>
		</View>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		borderRadius: 5,
		backgroundColor: '#fafafa',
		borderWidth: 1,
		marginTop: 20,
		padding: 20,
		fontSize: 16
	}
})
