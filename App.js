import React, { useEffect, useState } from 'react'
import { styles, SelectStyles } from './styles.js'
import { Text, View, Image, TouchableOpacity, Alert, BackHandler, SafeAreaView, ScrollView } from 'react-native'
import { Picker } from '@react-native-community/picker'
import * as Localization from 'expo-localization'
import * as Linking from 'expo-linking'

import Emoji from 'react-native-emoji'
import Axios from 'axios'

//구글번역기
const locale = Localization.locale.substring(0, 2)
console.log("My device's locale:", Localization.locale, '-->', locale)

export default function App() {
	const [whatBook, setWhatBook] = useState('cat') //book 선택
	const [imageUri, setImageUri] = useState(null) //이미지 url
	const [breeds, setBreeds] = useState(null) //종 리스트
	const [breed, setBreed] = useState('') //선택한 고양이 종류
	const [cat, setCat] = useState(null) //고양이 정보
	const [randomable, setRandomable] = useState(false) //랜덤검색 가능여부
	const [stack, setStack] = useState([]) //검색 히스토리

	useEffect(() => {
		//백버튼 종료 확인하기 useEffect에서 동작해야함
		const backAction = () => {
			Alert.alert('Catbook 종료', 'Catbook을 종료하시겠어요?', [
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: () => {
						setImageUri(null)
						setCat(null)
						setBreed('')
						setWhatBook('cat')
						BackHandler.exitApp()
					},
				},
			])
			return true
		}
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

		return () => backHandler.remove()
	}, [])

	useEffect(() => {
		//고양이종 리스트 가져오기. 한번만
		let url = 'https://api.thecatapi.com/v1/breeds'
		if (whatBook === 'cat') url = 'https://api.thecatapi.com/v1/breeds'
		else if (whatBook === 'dog') url = 'https://api.thedogapi.com/v1/breeds'

		Axios(url).then((res) => {
			const items = [{ label: '랜덤', value: 'random' }]
			for (let i = 0; i < res.data.length; i++) {
				items.push({
					label: res.data[i].name,
					value: res.data[i].id,
				})
			}
			setBreeds(items)
			setRandomable(true)
		})
	}, [whatBook])

	useEffect(() => {
		//고양이 종류 바뀌면 작동. 이미지 새로 가져오기
		if (breed === '') {
			//''이면 아무것도 안함. 메인이미지.
		} else {
			searchCatAsync()
		}
	}, [breed])

	//찾기 버튼 클릭시
	const handleButton = () => {
		if (breed === '') {
			//''이면 랜덤으로 설정
			setBreed('random')
		} else {
			searchCatAsync()
		}
	}

	//고양이 정보 가져오기
	const searchCatAsync = () => {
		let searchBreed = breed
		if (breed === 'random') {
			//랜덤 이미지 가져오기
			if (randomable) {
				//랜덤검색이 가능할때만
				let num = Math.floor(Math.random() * breeds.length) + 1 //고양이 종류만큼 정수 난수 생성 0번 제외
				searchBreed = breeds[num].value
				console.log('searchCatAsync, random breed:', searchBreed)
			}
		} else {
			//종류별 이미지 가져오기
			console.log('searchCatAsync, breed:', searchBreed)
		}

		//이미지 및 정보 가져오기
		let url = 'https://blog-imki123-backend.herokuapp.com/catbook/getAnimal/cat/' + searchBreed
		if (whatBook === 'dog') url = 'https://blog-imki123-backend.herokuapp.com/catbook/getAnimal/dog/' + searchBreed

		Axios.get(url, {
			withCredentials: true,
		}).then((res) => {
			if (res.data[0]) {
				setImageUri(res.data[0].url)

				//검색 기록 추가하기 stack
				res.data[0].animal = whatBook
				setStack([res.data[0]].concat(stack))

				//번역할 텍스트 설정하기
				let text = ''
				if (res.data[0].breeds[0].temperament) {
					text += res.data[0].breeds[0].temperament
				}
				if (res.data[0].breeds[0].description) {
					text += '__' + res.data[0].breeds[0].description
				}

				let url = 'https://blog-imki123-backend.herokuapp.com/catbook/translate/' + locale + '/' + text
				//번역하기

				Axios.get(url)
					.then((translated) => {
						//console.log(translated)
						translated = translated.data.split('__')

						res.data[0].breeds[0].temperament = translated[0]
						res.data[0].breeds[0].description = translated[1]
						setCat(res.data[0])
					})
					.catch((e) => {
						console.log(e)
						setCat(res.data[0])
					})
			} else {
				setImageUri(null)
				setCat('noInfo')
			}
		})
	}

	//검색 기록 클릭 시 이미지랑 정보 보여주기
	const pressStack = (i) => {
		setImageUri(stack[i].url)
		setCat(stack[i])
	}

	return (
		<SafeAreaView style={styles.safeContainer}>
			<ScrollView contentContainerStyle={styles.contentContainer} centerContent={true}>
				<View style={styles.container}>
				{/* Catbook */}
				{whatBook === 'cat' ? (
					<Text style={styles.title}>
						Catbook <Emoji name="cat2" style={{ fontSize: 20 }} />
					</Text>
				) : (
					<Text style={styles.title}>
						Dogbook <Emoji name="dog2" style={{ fontSize: 20 }} />
					</Text>
				)}

				{/* 고양이 이미지 */}
				{imageUri === null ? (
					<>{whatBook === 'cat' ? <Image source={require('./assets/main.png')} style={styles.image} /> : <Image source={require('./assets/dog_main.png')} style={styles.image} />}</>
				) : (
					<Image source={{ uri: imageUri }} style={styles.image} />
				)}

				{/* 고양이 설명 */}
				{cat && (
					<>
						{cat != 'noInfo' ? (
							<View style={styles.textContainer}>
								<Text style={styles.contentText}>- 종류: {cat.breeds[0].name}</Text>
								{cat.breeds[0].alt_names != undefined && <Text style={styles.contentText}>- 별명: {cat.breeds[0].alt_names}</Text>}
								{cat.breeds[0].origin != undefined && <Text style={styles.contentText}>- 출신지: {cat.breeds[0].origin}</Text>}
								{cat.breeds[0].adaptability != undefined && (
									<Text style={styles.contentText}>
										- 적응력 / 애정도 / 에너지: {cat.breeds[0].adaptability} / {cat.breeds[0].affection_level} / {cat.breeds[0].energy_level}
									</Text>
								)}
								{cat.breeds[0].child_friendly != undefined && (
									<Text style={styles.contentText}>
										- 어린이친화력 / 강아지친화력: {cat.breeds[0].child_friendly} / {cat.breeds[0].dog_friendly}
									</Text>
								)}
								{cat.breeds[0].temperament != undefined && <Text style={styles.contentText}>- 성격: {cat.breeds[0].temperament}</Text>}
								{cat.breeds[0].description != undefined && <Text style={styles.contentText}>- 특징: {cat.breeds[0].description}</Text>}
							</View>
						) : (
							<View style={styles.textContainer}>
								<Text style={{ textAlign: 'center' }}>
									찾는 정보가 없어요 <Emoji name="sob" style={{ fontSize: 20 }} />
								</Text>
							</View>
						)}
					</>
				)}

				{/* 고양이 종 목록 */}
				{breeds && (
					<Picker
						selectedValue={breed}
						style={styles.picker}
						onValueChange={(value, index) => {
							setBreed(value)
						}}
					>
						{breeds.map((i) => (
							<Picker.Item key={i.label} label={i.label} value={i.value} />
						))}
					</Picker>
				)}

				{/* 찾기 버튼 */}
				<TouchableOpacity onPress={handleButton} style={styles.button}>
					<Text style={styles.buttonText}>{whatBook === 'cat' ? '고양이 찾기' : '강아지 찾기'}</Text>
				</TouchableOpacity>

				{/* Cat Dog 전환 */}
				<View style={styles.changeBookView}>
					<Text
						style={styles.changeBookText}
						onPress={() => {
							whatBook === 'cat' ? setWhatBook('dog') : setWhatBook('cat')
							setBreed('')
							setImageUri(null)
							setCat(null)
							setRandomable(false)
						}}
					>
						{whatBook === 'cat' ? '강아지 좋아해?' : '고양이 보러갈래?'}
					</Text>
				</View>

				<View style={styles.stackView}>
					{stack.length > 0 && <Text style={styles.stackTitle}>{whatBook === 'cat' ? '찾아본 고양이' : '찾아본 강아지'}</Text>}
					{stack.map(
						(i, idx) =>
							whatBook === i.animal && (
								<TouchableOpacity style={styles.stackFlex} key={idx} onPress={() => pressStack(idx)}>
									<Image source={{ uri: i.url }} style={styles.stackImg} />
									<Text style={styles.stackText}>{i.breeds[0].name}</Text>
								</TouchableOpacity>
							),
					)}
				</View>
				</View>
				<TouchableOpacity style={styles.footer} >
					<Text style={styles.plainText}>made By </Text>
					<Text style={styles.linkText} onPress={() => Linking.openURL('https://github.com/Imki123')}>imki123</Text> 
					<Image source={require('./assets/github_small.png')} style={styles.githubImg} />
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	)
}
