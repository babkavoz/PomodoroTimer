import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAllData = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys()
		const data = await AsyncStorage.multiGet(keys)
		const result = data.reduce((acc, [key, value]) => {
			acc[key] = JSON.parse(value)
			return acc
		}, {})
		console.log('getAllData:', result)
		return result
	} catch (error) {
		console.error('Error while getting data from AsyncStorage:', error)
		throw error
	}
}

export const setMultipleItems = async settingsToSave => {
	try {
		for (const { key, value } of settingsToSave) {
			const stringValue = JSON.stringify(value)
			await AsyncStorage.setItem(key, stringValue)
			console.log('Записан ключ:', key, 'со значением:', stringValue)
		}
	} catch (error) {
		console.error('Error updating or appending data:', error)
		throw error
	}
}

export const clearStorage = async () => {
	try {
		await AsyncStorage.clear()
		console.log('AsyncStorage cleared successfully!')
	} catch (error) {
		console.error('Error clearing AsyncStorage:', error)
		throw error
	}
}

export const getMultipleItems = async keys => {
	try {
		const values = await AsyncStorage.multiGet(keys)
		const result = values.map(([key, value]) => ({
			key,
			value: JSON.parse(value)
		}))

		console.log('Multiple items retrieved successfully:', result)
		return result
	} catch (error) {
		console.error('Error retrieving multiple items:', error)
		throw error
	}
}
