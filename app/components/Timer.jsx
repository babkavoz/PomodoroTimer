// Timer.js
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { setMultipleItems, getMultipleItems } from './TimerSettingsStorage'
import { constants } from '../gstyles'

export default function Timer() {
	const [workTime, setWorkTime] = useState(30)
	const [restTime, setRestTime] = useState(5)
	const [bigRestTime, setBigRestTime] = useState(15)
	const [sessionCount, setSessionCount] = useState(5)

	const [totalWorkTime, setTotalWorkTime] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isWorkTime, setIsWorkTime] = useState(true)
	const [currentSession, setCurrentSession] = useState(3)

	const loadSettingsData = async () => {
		try {
			const timerSettings = await getMultipleItems([
				'workTime',
				'restTime',
				'bigRestTime',
				'sessionCount',
				'totalWorkTime',
				'isPlaying',
				'isWorkTime',
				'currentSession'
			])

			if (timerSettings) {
				setWorkTime(timerSettings[0].value)
				setRestTime(timerSettings[1].value)
				setBigRestTime(timerSettings[2].value)
				setSessionCount(timerSettings[3].value)
				setTotalWorkTime(timerSettings[4].value)
				setIsPlaying(timerSettings[5].value)
				setIsWorkTime(timerSettings[6].value)
				setCurrentSession(timerSettings[7].value)
			}
		} catch (error) {
			console.error('[MY_APP] Error loading settings:', error)
		}
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
				{ key: 'sessionCount', value: sessionCount },
				{ key: 'totalWorkTime', value: totalWorkTime },
				{ key: 'isPlaying', value: isPlaying },
				{ key: 'isWorkTime', value: isWorkTime },
				{ key: 'currentSession', value: currentSession }
			]
			await setMultipleItems(settingsToSave)
		} catch (error) {
			console.error('Error saving timer settings:', error)
		}
	}

	useEffect(() => {
		saveSettingsData()
	}, [
		workTime,
		restTime,
		bigRestTime,
		sessionCount,
		totalWorkTime,
		isPlaying,
		isWorkTime,
		currentSession
	])

	const [key, setKey] = useState(0)

	const chooseCircleStyle = (index, currentSession) => {
		if (index < currentSession - 1) {
			return styles.circle
		} else if (index + 1 === currentSession) {
			return styles.circleCurrent
		} else {
			return styles.circleNotReady
		}
	}

	const nextTime = () => {
		if (isWorkTime) setTotalWorkTime(totalWorkTime + workTime * 60)
		if (currentSession === sessionCount && !isWorkTime) {
			setCurrentSession(1)
		} else if (!isWorkTime) {
			setCurrentSession(currentSession + 1)
		}
		setIsWorkTime(!isWorkTime)
		setIsPlaying(false)
		setKey(prevKey => prevKey + 1)
	}

	return (
		<View style={styles.screenContainer}>
			<View style={styles.container}>
				<Text style={styles.mainText}>
					{'Total Work time ' + Math.round(totalWorkTime / 60) + ' minutes'}
				</Text>
			</View>
			<View style={(styles.container, styles.timer)}>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={
						isWorkTime
							? workTime * 60
							: currentSession === sessionCount
							? bigRestTime * 60
							: restTime * 60
					}
					colors={['#004777', '#F7B801', '#A30000', '#A30000']}
					colorsTime={[7, 5, 2, 0]}
					trailColor='#2F2F4C'
					onComplete={() => {
						nextTime()
					}}
					size={(450, 350)}
				>
					{({ remainingTime }) => {
						let minutes = Math.floor(remainingTime / 60)
						minutes = minutes < 10 ? '0' + minutes : minutes
						let seconds = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds
						return (
							<View>
								<Text style={styles.clockText}>
									{isWorkTime
										? 'Work'
										: currentSession === sessionCount
										? 'Big rest'
										: 'Rest'}
								</Text>
								<Text
									style={styles.ClockTimeText}
								>{`${minutes}:${seconds}`}</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>
			</View>
			<View style={styles.rowContainer}>
				<TouchableOpacity
					onPress={async () => {
						await loadSettingsData()
						setTotalWorkTime(0)
						setCurrentSession(1)
						setIsWorkTime(true)
						setIsPlaying(false)
					}}
				>
					<MaterialIcons name={'update'} size={50} color='white' />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setIsPlaying(!isPlaying)}
					style={{ paddingHorizontal: 15 }}
				>
					<MaterialIcons
						name={isPlaying ? 'play-arrow' : 'pause'}
						size={50}
						color='white'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						nextTime()
					}}
				>
					<MaterialIcons name={'arrow-forward-ios'} size={46} color='white' />
				</TouchableOpacity>
			</View>
			<View style={styles.rowContainer}>
				{Array.from(Array(sessionCount)).map((_, index) => (
					<View key={index} style={styles.itemContainer}>
						<View style={chooseCircleStyle(index, currentSession)} />
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screenContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: constants.primaryColor,
		height: '100%'
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: constants.primaryColor,
		marginTop: 5,
		marginBottom: 35
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: constants.primaryColor,
		marginVertical: 15
	},
	mainText: {
		color: 'white',
		fontSize: 24,
		alignSelf: 'center',
		marginTop: 10
	},
	clockText: {
		color: 'white',
		fontSize: 40,
		alignSelf: 'center'
	},
	ClockTimeText: {
		color: 'white',
		fontSize: 84,
		marginBottom: 50
	},

	circle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'red',
		marginLeft: 5
	},
	circleCurrent: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'red',
		borderWidth: 2,
		borderColor: 'white',
		marginLeft: 5
	},
	circleNotReady: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'red',
		marginLeft: 5,
		opacity: 0.1
	}
})
