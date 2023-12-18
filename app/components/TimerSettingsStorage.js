import AsyncStorage from '@react-native-async-storage/async-storage'
const storageKey = 'storagedata'

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

export const updateOrAppend = async settingsToSave => {
	try {
		console.log(
			'Функция updateOrAppend получила такие данные для записи:',
			settingsToSave
		)
		// Получаем текущие данные из AsyncStorage
		const allData = await getAllData()
		console.log(
			'Функция updateOrAppend получила такие данные из стореджа:',
			allData
		)
		for (const { key, value } of settingsToSave) {
			const stringValue = JSON.stringify(value)
			await AsyncStorage.setItem(key, stringValue)
			console.log('Записан ключ:', key, 'со значением:', stringValue)
		}
		/*
		// Обновляем или добавляем новые данные
		for (const { key, value } of settingsToSave) {
			// Создаем временный объект с текущим ключом и значением
			const tempData = { [key]: value }

			// Объединяем временный объект с текущими данными
			const updatedData = { ...allData, ...tempData }

			// Преобразуем данные в строку перед сохранением
			const stringifiedData = JSON.stringify(updatedData)

			// Сохраняем обновленные данные в AsyncStorage
			await AsyncStorage.setItem(storageKey, stringifiedData)

			console.log('Записан ключ:', key, 'со значением:', value)
		}*/
		return allData
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

export const setMultipleItems = async settingsToSet => {
	try {
		updateOrAppend(settingsToSet)
	} catch (error) {
		console.error('Error setting multiple items:', error)
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
