import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollPicker } from 'react-native-value-picker'

const generateMockData = count => {
	const mockData = []
	for (let i = 0; i <= count; i++) {
		mockData.push({ value: i, label: `${i} minutes` })
	}
	return mockData
}

const MOCK_DATA = generateMockData(100)
const MOCK_DATA2 = generateMockData(10)

export default function Settings() {
	const [pickedWorkTime, setPickedWorkTime] = useState(25)
	const [pickedRestTime, setPickedRestTime] = useState(5)
	const [pickedBigRestTime, setPickedBigRestTime] = useState(15)
	const [pickedSessionCount, setPickedSessionCount] = useState(5)

	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Text>{'Work time'}</Text>
				<ScrollPicker
					currentValue={pickedWorkTime}
					extraData={pickedWorkTime}
					list={MOCK_DATA}
					onItemPress={setPickedWorkTime}
					labelColor='blue'
					separatorColor='purple'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Rest time'}</Text>
				<ScrollPicker
					currentValue={pickedRestTime}
					extraData={pickedRestTime}
					list={MOCK_DATA}
					onItemPress={setPickedRestTime}
					labelColor='blue'
					separatorColor='purple'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Big rest time'}</Text>
				<ScrollPicker
					currentValue={pickedBigRestTime}
					extraData={pickedBigRestTime}
					list={MOCK_DATA}
					onItemPress={setPickedBigRestTime}
					labelColor='blue'
					separatorColor='purple'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Session Count'}</Text>
				<ScrollPicker
					currentValue={pickedSessionCount}
					extraData={pickedSessionCount}
					list={MOCK_DATA2}
					onItemPress={setPickedSessionCount}
					labelColor='blue'
					separatorColor='purple'
					selectedColor='red'
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		height: 500
	},
	title: {
		fontSize: 24,
		marginBottom: 20
	},
	item: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60
	}
})
