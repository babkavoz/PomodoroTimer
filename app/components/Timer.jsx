import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Timer() {
	const workTime = 10
	const restTime = 5
	const bigRestTime = 15
	const [totalWorkTime, setTotalWorkTime] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isWorkTime, SetIsWorkTime] = useState(true)
	const [currentSession, setCurrentSession] = useState(3)
	const [sessionCount, setSessionCount] = useState(5)
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
		if (isWorkTime) setTotalWorkTime(totalWorkTime + workTime)
		if (currentSession == sessionCount && !isWorkTime) {
			setCurrentSession(1)
		} else if (!isWorkTime) {
			setCurrentSession(currentSession + 1)
		}
		SetIsWorkTime(!isWorkTime)
		setIsPlaying(false)

		setKey(prevKey => prevKey + 1)
	}
	return (
		<View>
			<View style={styles.container}>
				<Text>
					{'Total Work time ' + Math.round(totalWorkTime / 60) + ' minutes'}
				</Text>
			</View>
			<View style={styles.container}>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={
						isWorkTime
							? workTime
							: currentSession == sessionCount
							? bigRestTime
							: restTime
					}
					colors={['#004777', '#F7B801', '#A30000', '#A30000']}
					colorsTime={[7, 5, 2, 0]}
					trailColor='#2F2F4C'
					onComplete={() => {
						nextTime()
					}}
				>
					{({ remainingTime }) => {
						let minutes = Math.floor(remainingTime / 60)
						minutes = minutes < 10 ? '0' + minutes : minutes
						let seconds = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds
						return (
							<View>
								<Text styles={styles.ClockText}>
									{isWorkTime
										? 'Work'
										: currentSession == sessionCount
										? 'Big rest'
										: 'Rest'}
								</Text>
								<Text
									styles={styles.ClockTimeText}
								>{`${minutes}:${seconds}`}</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>
			</View>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						setCurrentSession(1)
						setIsPlaying(false)
					}}
				>
					<MaterialIcons name={'update'} size={50} color='black' />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
					<MaterialIcons
						name={isPlaying ? 'play-arrow' : 'pause'}
						size={50}
						color='black'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						nextTime()
					}}
				>
					<MaterialIcons name={'arrow-forward-ios'} size={46} color='black' />
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
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
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	ClockText: {},
	ClockTimeText: {},
	itemContainer: {
		alignItems: 'center',
		justifyContent: 'center'
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
