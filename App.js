import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, BackHandler, SafeAreaView, ScrollView } from 'react-native'
import Select from 'react-native-picker-select'
import axios from 'axios'
import Emoji from 'react-native-emoji'
import { styles, SelectStyles } from './styles.js'
import * as Localization from 'expo-localization'
import Axios from 'axios'

//구글번역기
const locale = Localization.locale.substring(0, 2)

export default function App() {
	const [whatBook, setWhatBook] = useState('cat') //book 선택
	const [imageUri, setImageUri] = useState(null) //이미지 url
	const [breeds, setBreeds] = useState(null) //종 리스트
	const [breed, setBreed] = useState(null) //선택한 고양이 종류
	const [cat, setCat] = useState(null) //고양이 정보
	const [randomable, setRandomable] = useState(false) //랜덤검색 가능여부

	useEffect(() => {
		//고양이종 리스트 가져오기. 한번만
		let url = 'https://api.thecatapi.com/v1/breeds'
		if (whatBook === 'cat') url = 'https://api.thecatapi.com/v1/breeds'
		else if (whatBook === 'dog') url = 'https://api.thedogapi.com/v1/breeds'

		axios(url).then((res) => {
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
		//백버튼 종료 확인하기
		const backAction = () => {
			Alert.alert('Catbook 종료', 'Catbook을 종료하시겠어요?', [
				{
					text: 'Cancel',
					onPress: () => console.log('canceled'),
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: () => {
						setImageUri(null)
						setCat(null)
						setBreed(null)
						setWhatBook('cat')
						BackHandler.exitApp()
						backHandler.remove()
					},
				},
			])
			return true
		}
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
	})

	useEffect(() => {
		//고양이 종류 바뀌면 작동. 이미지 새로 가져오기
		console.log('useEffect, breed:', breed)
		if (breed === null) {
			//null이면 아무것도 안함. 메인이미지.
		} else {
			searchCatAsync()
		}
	}, [breed])

	//찾기 버튼 클릭시
	const handleButton = () => {
		console.log('handleButton')
		if (breed === null) {
			//null이면 랜덤으로 설정
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
				let num = Math.floor(Math.random() * breeds.length) //고양이 종류만큼 정수 난수 생성
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

		Axios.get(url,{
			withCredentials: true,
		})
		.then((res) => {
			if (res.data[0]) {
				setImageUri(res.data[0].url)

				//번역할 텍스트 설정하기
				let text = ''
				if (res.data[0].breeds[0].temperament) {
					text += res.data[0].breeds[0].temperament
				}
				if (res.data[0].breeds[0].description) {
					text += '__' + res.data[0].breeds[0].description
				}

				console.log("My device's locale:", Localization.locale, '-->', locale)
				let url = 'https://blog-imki123-backend.herokuapp.com/catbook/translate/' + locale + '/' + text
				//번역하기

				Axios.get(url)
					.then((translated) => {
						console.log(translated)
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
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer} centerContent={true}>
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

				{/* 고양이 종 목록 */}
				{breeds && <Select placeholder={{}} items={breeds} style={SelectStyles} onValueChange={(value, index) => setBreed(value)} />}

				{/* 고양이 설명 */}
				{cat && (
					<>
						{cat != 'noInfo' ? (
							<View style={styles.textContainer}>
								<Text>- 종류: {cat.breeds[0].name}</Text>
								{cat.breeds[0].alt_names != undefined && <Text>- 별명: {cat.breeds[0].alt_names}</Text>}
								{cat.breeds[0].origin != undefined && <Text>- 출신지: {cat.breeds[0].origin}</Text>}
								{cat.breeds[0].adaptability != undefined && (
									<Text>
										- 적응력 / 애정도 / 에너지: {cat.breeds[0].adaptability} / {cat.breeds[0].affection_level} / {cat.breeds[0].energy_level}
									</Text>
								)}
								{cat.breeds[0].child_friendly != undefined && (
									<Text>
										- 어린이친화력 / 강아지친화력: {cat.breeds[0].child_friendly} / {cat.breeds[0].dog_friendly}
									</Text>
								)}
								{cat.breeds[0].temperament != undefined && <Text>- 성격: {cat.breeds[0].temperament}</Text>}
								{cat.breeds[0].description != undefined && <Text>- 특징: {cat.breeds[0].description}</Text>}
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
							setBreed(null)
							setImageUri(null)
							setCat(null)
							setRandomable(false)
						}}
					>
						{whatBook === 'cat' ? '강아지 좋아해?' : '고양이 보러갈래?'}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
