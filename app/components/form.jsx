import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default function Form({ addHandler }) {
	const [text, setText] = useState('')

	const onChange = text => {
		setText(text.trim())
	}

	const handleAdd = () => {
		if (text !== '') {
			addHandler(text)
			setText('')
		}
	}

	return (
		<View>
			<TextInput
				style={styles.input}
				onChangeText={onChange}
				placeholder='text'
				placeholderTextColor='white'
				value={text}
			/>
			<Button title='Add' color={'green'} onPress={handleAdd} />
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		borderBottomWidth: 1,
		borderColor: 'white',
		color: 'white',
		padding: 10,
		marginVertical: 30
	}
})
