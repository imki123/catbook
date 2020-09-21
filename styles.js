import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

let styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Constants.statusBarHeight,
		maxWidth: 600,
		margin: 'auto',
	},
	contentContainer: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 600,
		margin: 'auto',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	image: {
		width: screenWidth,
		maxWidth: 600,
		height: 300,
		resizeMode: 'contain',
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
		fontSize: 16,
		width: 300,
	},
	changeBookView: {
		width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
	},
	changeBookText: {
    margin: 0,
		fontSize: 14,
		color: 'blue',
		padding: 10,
	},
})

const SelectStyles = StyleSheet.create({
	//셀렉트 박스 스타일
	inputIOS: {
		fontSize: 20,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		width: 300,
		alignSelf: 'center',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 20,
		width: 300,
		alignSelf: 'center',
		color: 'black',
	},
})

export { styles, SelectStyles }
