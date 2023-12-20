import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native'
import ListItem from './ListItem'
import Form from './form'
import { setMultipleItems, getMultipleItems } from './TimerSettingsStorage'
import { constants } from '../gstyles'

export default function Notes() {
	const [listOfItems, setListOfItems] = useState([
		{ text: 'Заполнить список дел', key: 1 }
	])

	const addHandler = text => {
		setListOfItems(list => {
			return [
				{ text: text, key: Math.random().toString(36).substring(7) },
				...list
			]
		})
	}

	const deleteHandler = key => {
		console.log('want to delete', key)
		setListOfItems(list => {
			const updatedList = list.filter(item => item.key !== key)
			saveSettingsData(updatedList) // Сохраняем обновленный список после удаления
			return updatedList
		})
	}

	const loadSettingsData = async () => {
		try {
			const timerSettings = await getMultipleItems(['listOfItems'])

			if (timerSettings) {
				setListOfItems(timerSettings[0].value)
				console.log('Данные', listOfItems)
			}
		} catch (error) {
			console.error('[MY_APP] Error loading settings:', error)
		}
	}
	/*
	useEffect(() => {
		loadSettingsData()
	}, [])
*/
	const saveSettingsData = async () => {
		try {
			const settingsToSave = [{ key: 'listOfItems', value: listOfItems }]
			await setMultipleItems(settingsToSave)
		} catch (error) {
			console.error('Error saving timer settings:', error)
		}
	}
	/*
	useEffect(() => {
		saveSettingsData()
	}, [listOfItems])
*/
	return (
		<View style={styles.container}>
			<Form addHandler={addHandler} />
			<View style={styles.rowContainer}>
				<TouchableOpacity
					style={styles.buttonRow}
					onPress={() => {
						saveSettingsData()
					}}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonRow}
					onPress={() => {
						loadSettingsData()
					}}
				>
					<Text style={styles.buttonText}>Load</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={listOfItems}
				renderItem={({ item }) => (
					<ListItem el={item} deleteHandler={deleteHandler} />
				)}
				style={styles.list}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: constants.primaryColor,
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingHorizontal: '20%'
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 15
	},
	buttonRow: {
		flex: 1,
		marginHorizontal: 5,
		height: 30,
		backgroundColor: 'red'
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		alignSelf: 'center'
	},
	list: {}
})
