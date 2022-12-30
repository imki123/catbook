import React from 'react'
import { Image, Linking, Text, TouchableOpacity } from 'react-native'

import gitHubIcon from '../assets/github_small.png'
import { styles } from '../styles'

const GithubIcon = () => {
	return (
		<TouchableOpacity style={styles.footer}>
			<Text
				style={styles.linkText}
				onPress={() => Linking.openURL('https://github.com/imki123')}
			>
				imki123
			</Text>
			<Image source={gitHubIcon} style={styles.githubImg} />
		</TouchableOpacity>
	)
}

export default GithubIcon
