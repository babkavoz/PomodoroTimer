import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Timer() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentSession, setCurrentSession] = useState(1)
	const sessionCount = 5

	return (
		<View>
			<Text>Timer</Text>
			<TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
				<MaterialIcons
					name={isPlaying ? 'play-arrow' : 'pause'}
					size={50}
					color='black'
				/>
			</TouchableOpacity>
			<CountdownCircleTimer
				isPlaying={isPlaying}
				duration={1237}
				colors={['#004777', '#F7B801', '#A30000', '#A30000']}
				colorsTime={[7, 5, 2, 0]}
				trailColor='#2F2F4C'
				onComplete={() => {
					setIsPlaying(false)
					setCurrentSession(prevSession =>
						prevSession < sessionCount ? prevSession + 1 : prevSession
					)
				}}
			>
				{({ remainingTime }) => {
					let minutes = Math.floor(remainingTime / 60)
					minutes = minutes < 10 ? '0' + minutes : minutes
					let seconds = remainingTime % 60
					seconds = seconds < 10 ? '0' + seconds : seconds
					return <Text>{`${minutes}:${seconds}`}</Text>
				}}
			</CountdownCircleTimer>
			<View style={styles.container}>
				{Array.from(Array(sessionCount)).map((_, index) => (
					<View key={index} style={styles.itemContainer}>
						<View
							style={[
								styles.circle,
								{
									borderColor:
										currentSession === index + 1 ? 'blue' : 'transparent',
									opacity: currentSession >= index + 1 ? 1 : 0.75
								}
							]}
						/>
						{index + 1 !== sessionCount - 1 && <View style={styles.dash} />}
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
	itemContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'red',
		borderWidth: 2
	},
	dash: {
		width: 20,
		height: 2,
		backgroundColor: 'red',
		position: 'absolute',
		marginLeft: 20, // Расстояние между кружочком и палочкой
		marginTop: -1 // Отрицательный marginTop для того, чтобы палочка касалась края кружочка
	}
})
