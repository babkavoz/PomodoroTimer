// settings.js
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollPicker } from 'react-native-value-picker'
import { constants } from '../gstyles'
import {
	setMultipleItems,
	getMultipleItems,
	clearStorage,
	getAllData
} from './TimerSettingsStorage'

const generateMockData = count => {
	const mockData = []
	for (let i = 1; i <= count; i++) {
		mockData.push({ value: i, label: `${i} minutes` })
	}
	return mockData
}

const generateMockData2 = count => {
	const mockData = []
	for (let i = 1; i <= count; i++) {
		mockData.push({ value: i, label: `${i} sessions` })
	}
	return mockData
}

const MOCK_DATA = generateMockData(100)
const MOCK_DATA2 = generateMockData2(15)

export default function Settings() {
	const [workTime, setWorkTime] = useState(5)
	const [restTime, setRestTime] = useState(5)
	const [bigRestTime, setBigRestTime] = useState(5)
	const [sessionCount, setSessionCount] = useState(5)

	const loadSettingsData = async () => {
		try {
			const timerSettings = await getMultipleItems([
				'workTime',
				'restTime',
				'bigRestTime',
				'sessionCount'
			])
			console.log('loadsettingsdata получила вот что', timerSettings)
			if (timerSettings) {
				setWorkTime(timerSettings[0].value)
				setRestTime(timerSettings[1].value)
				setBigRestTime(timerSettings[2].value)
				setSessionCount(timerSettings[3].value)
				console.log('result', workTime, restTime, bigRestTime, sessionCount)
			}
		} catch (error) {
			console.error('Error loading settings:', error)
		}
	}

	const handleSaveButtonPress = () => {
		saveSettingsData()
	}
	const handleClearStorage = () => {
		clearStorage()
	}
	const handleGetAllData = () => {
		data = getAllData()
	}

	useEffect(() => {
		loadSettingsData()
	}, [])

	const saveSettingsData = async () => {
		try {
			const settingsToSave = [
				{ key: 'workTime', value: workTime },
				{ key: 'restTime', value: restTime },
				{ key: 'bigRestTime', value: bigRestTime },
				{ key: 'sessionCount', value: sessionCount }
			]
			await setMultipleItems(settingsToSave)
		} catch (error) {
			console.error('Error saving timer settings:', error)
		}
	}

	useEffect(() => {
		saveSettingsData()
	}, [workTime, restTime, bigRestTime, sessionCount])

	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				<View style={styles.container}>
					<Text style={styles.textName}>{'Work time'}</Text>
					<ScrollPicker
						currentValue={workTime}
						list={MOCK_DATA}
						onItemPress={setWorkTime}
						labelColor='white'
						separatorColor='white'
						selectedColor='red'
					/>
				</View>
				<View style={styles.container}>
					<Text style={styles.textName}>{'Rest time'}</Text>
					<ScrollPicker
						currentValue={restTime}
						list={MOCK_DATA}
						onItemPress={setRestTime}
						labelColor='white'
						separatorColor='white'
						selectedColor='red'
					/>
				</View>
				<View style={styles.container}>
					<Text style={styles.textName}>{'Big rest time'}</Text>
					<ScrollPicker
						currentValue={bigRestTime}
						list={MOCK_DATA}
						onItemPress={setBigRestTime}
						labelColor='white'
						separatorColor='white'
						selectedColor='red'
					/>
				</View>
			</View>

			<View style={styles.container}>
				<Text style={styles.textName}>{'Session Count'}</Text>
				<ScrollPicker
					currentValue={sessionCount}
					list={MOCK_DATA2}
					onItemPress={setSessionCount}
					labelColor='white'
					separatorColor='white'
					selectedColor='red'
				/>
			</View>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: constants.primaryColor,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: constants.primaryColor,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textName: {
		color: 'white',
		fontSize: 20,
		alignSelf: 'center'
	}
})
