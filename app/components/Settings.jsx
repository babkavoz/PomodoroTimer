// Settings.js
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollPicker } from 'react-native-value-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	loadTimerSettings,
	saveTimerSettings,
	loadAdditionalSettings,
	saveAdditionalSettings
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
	const [workTime, setWorkTime] = useState(25)
	const [restTime, setRestTime] = useState(5)
	const [bigRestTime, setBigRestTime] = useState(15)
	const [sessionCount, setSessionCount] = useState(5)

	const loadSettings = async () => {
		try {
			const timerSettings = await loadTimerSettings()
			const additionalSettings = await loadAdditionalSettings()

			if (timerSettings) {
				setWorkTime(timerSettings.workTime)
				setRestTime(timerSettings.restTime)
				setBigRestTime(timerSettings.bigRestTime)
				setSessionCount(timerSettings.sessionCount)
			}

			if (additionalSettings) {
				// Обработка загрузки дополнительных настроек
			}
		} catch (error) {
			console.error('Error loading settings:', error)
		}
	}

	const saveSettings = async () => {
		try {
			const timerSettings = {
				workTime,
				restTime,
				bigRestTime,
				sessionCount
			}
			await saveTimerSettings(timerSettings)
			// Сохранение дополнительных настроек, если они есть
		} catch (error) {
			console.error('Error saving settings:', error)
		}
	}

	useEffect(() => {
		// Загружаем и сохраняем настройки при монтировании и обновлении компонента
		loadSettings()
		saveSettings()
	}, [workTime, restTime, bigRestTime, sessionCount])

	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Text>{'Work time'}</Text>
				<ScrollPicker
					currentValue={workTime}
					extraData={workTime}
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
					extraData={restTime}
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
					extraData={bigRestTime}
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
					extraData={sessionCount}
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
