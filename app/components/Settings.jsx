// settings.js
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollPicker } from 'react-native-value-picker'
import {
	setMultipleItems,
	getMultipleItems,
	clearStorage,
	getAllData
} from './TimerSettingsStorage' // Замените на имя вашего файла с кодом

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

	const someAsyncFunction = async () => {
		try {
			console.log('начало someAsyncFunction')
			await loadSettingsData()
			// Здесь будет выполнен код после завершения loadSettingsData
			console.log('loadSettingsData выполнена')
			// Другой код, который вы хотите выполнить после loadSettingsData
		} catch (error) {
			console.error('Произошла ошибка:', error)
		}
	}

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
		someAsyncFunction()
	}, [])

	return (
		<View style={styles.container}>
			<Button title='clear' onPress={handleClearStorage} />
			<Button title='Save Settings' onPress={handleSaveButtonPress} />
			<Button title='проверить сторедж' onPress={handleGetAllData} />
			<View style={styles.container}>
				<Text>{'Work time'}</Text>
				<ScrollPicker
					currentValue={workTime}
					initialNumToRender={5}
					list={MOCK_DATA}
					onItemPress={setWorkTime}
					labelColor='blue'
					separatorColor='white'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Rest time'}</Text>
				<ScrollPicker
					currentValue={restTime}
					initialNumToRender={5}
					list={MOCK_DATA}
					onItemPress={setRestTime}
					labelColor='blue'
					separatorColor='white'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Big rest time'}</Text>
				<ScrollPicker
					currentValue={bigRestTime}
					initialNumToRender={5}
					list={MOCK_DATA}
					onItemPress={setBigRestTime}
					labelColor='blue'
					separatorColor='white'
					selectedColor='red'
				/>
			</View>
			<View style={styles.container}>
				<Text>{'Session Count'}</Text>
				<ScrollPicker
					currentValue={sessionCount}
					initialNumToRender={5}
					list={MOCK_DATA2}
					onItemPress={setSessionCount}
					labelColor='blue'
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
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		height: 500
	}
})
