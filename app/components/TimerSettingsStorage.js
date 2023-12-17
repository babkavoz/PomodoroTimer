// TimerSettingsStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage'

export const loadTimerSettings = async () => {
	try {
		const savedSettings = await AsyncStorage.getItem('timerSettings')
		if (savedSettings) {
			return JSON.parse(savedSettings)
		}
	} catch (error) {
		console.error('Error loading timer settings:', error)
	}
	return null
}

export const saveTimerSettings = async settings => {
	try {
		await AsyncStorage.setItem('timerSettings', JSON.stringify(settings))
	} catch (error) {
		console.error('Error saving timer settings:', error)
	}
}

export const loadAdditionalSettings = async () => {
	try {
		const savedSettings = await AsyncStorage.getItem('additionalSettings')
		if (savedSettings) {
			return JSON.parse(savedSettings)
		}
	} catch (error) {
		console.error('Error loading additional settings:', error)
	}
	return null
}

export const saveAdditionalSettings = async settings => {
	try {
		await AsyncStorage.setItem('additionalSettings', JSON.stringify(settings))
	} catch (error) {
		console.error('Error saving additional settings:', error)
	}
}
