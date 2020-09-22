import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { TouchableWithoutFeedback } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

let styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Constants.statusBarHeight,
		width: screenWidth,
		maxWidth: 600,
		margin: 'auto',
	},
	contentContainer: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: screenWidth,
		maxWidth: 600,
		margin: 'auto',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	image: {
		width: '100%',
		height: 300,
		resizeMode: 'contain',
		marginBottom: 10,
	},

	picker: {
		width: screenWidth -100,
		maxWidth: 500,
		height: 30,
		backgroundColor: '#eee',
		marginTop: 10,
		marginBottom: 10,
	},
	button: {
		backgroundColor: 'blue',
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	},
	textContainer: {
		textAlign: 'left',
		width: screenWidth -100,
		maxWidth: 500,
	},
	contentText: {
		fontSize: 16,
	},
	changeBookView: {
		width: screenWidth,
		maxWidth: 600,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	changeBookText: {
    	margin: 0,
		fontSize: 16,
		color: 'blue',
		padding: 10,
	},
	stackTitle : {
		width: '100%',
		fontSize: 16,
		color: 'black',
		textAlign: 'left'
	},
	stackView : {
		width: screenWidth -100,
		maxWidth: 500,
		textAlign: 'left',
	},
	stackFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	stackImg : {
		width: 50,
		height: 50,
		resizeMode: 'contain',
	},
	stackText : {
		margin: 0,
		fontSize: 16,
		color: 'blue',
		paddingLeft: 12,
	},
})

export { styles }
