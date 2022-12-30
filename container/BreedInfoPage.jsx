/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert,
	BackHandler,
	ScrollView,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Emoji from 'react-native-emoji'

import axios from 'axios'
import * as Linking from 'expo-linking'

import dogMain from '../assets/dog_main.png'
import gitHubIcon from '../assets/github_small.png'
import catMain from '../assets/main.png'
import { styles } from '../styles'

const BreedInfoPage = () => {
	const [whatBook, setWhatBook] = useState('cat') //book 선택
	const [imageUri, setImageUri] = useState(null) //이미지 url
	const [breeds, setBreeds] = useState(null) //종 리스트
	const [breed, setBreed] = useState('') //선택한 고양이 종류
	const [breedInfo, setBreedInfo] = useState(null) //고양이 정보
	const [randomable, setRandomable] = useState(false) //랜덤검색 가능여부
	const [stack, setStack] = useState([]) //검색 히스토리
	const [open, setOpen] = useState(false)

	// effect
	useEffect(() => {
		const body = document.querySelector('body')
		if (body) {
			if (open) {
				body.style.overflow = 'hidden'
			} else {
				body.style.overflow = 'auto'
			}
		}
	}, [open])

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
						setBreedInfo(null)
						setBreed('')
						setWhatBook('cat')
						BackHandler.exitApp()
					},
				},
			])
			return true
		}
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		)

		return () => backHandler.remove()
	}, [])

	useEffect(() => {
		//고양이종 리스트 가져오기. 한번만
		let url = `https://api.the${whatBook}api.com/v1/breeds`

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
		//고양이 종류 바뀌면 작동. 이미지 새로 가져오기
		if (breed === '') {
			//''이면 아무것도 안함. 메인이미지.
		} else {
			searchCatAsync()
		}
	}, [breed, searchCatAsync])

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
	const searchCatAsync = useCallback(() => {
		let searchBreed = breed
		if (breed === 'random') {
			//랜덤 이미지 가져오기
			if (randomable) {
				//랜덤검색이 가능할때만
				let num = Math.floor(Math.random() * breeds.length) + 1 //고양이 종류만큼 정수 난수 생성 0번 제외
				searchBreed = breeds?.[num]?.value
			}
		}

		//이미지 및 정보 가져오기
		const api_url =
			process.env.NODE_ENV === 'development'
				? 'http://localhost:4001'
				: 'https://expressgoyoung2-production.up.railway.app'
		axios
			.get(api_url + `/catbook/getAnimal/${whatBook}/${searchBreed}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data[0]) {
					setImageUri(res.data[0].url)
					setBreedInfo(res.data[0])

					//검색 기록 추가하기 stack
					res.data[0].animal = whatBook
					if (!res.data[0].breeds?.[0]?.name) {
						const finded = breeds?.find((item) => item.value === searchBreed)
						res.data[0].breeds = [{ name: finded?.label || searchBreed }]
					}
					setStack((state) => [res.data[0]].concat(state))
				} else {
					setImageUri(null)
					setBreedInfo('noInfo')
				}
			})
	}, [breed, breeds, randomable, whatBook])

	//검색 기록 클릭 시 이미지랑 정보 보여주기
	const pressStack = (i) => {
		setImageUri(stack[i].url)
		setBreedInfo(stack[i])
	}

	return (
		<ScrollView
			contentContainerStyle={styles.contentContainer}
			centerContent={true}
		>
			<View style={styles.container}>
				{/* Catbook */}
				{whatBook === 'cat' ? (
					<Text style={styles.title}>Catbook 🐈</Text>
				) : (
					<Text style={styles.title}>Dogbook 🐕</Text>
				)}

				{/* 고양이 이미지 */}
				{imageUri === null ? (
					<>
						{whatBook === 'cat' ? (
							<Image source={catMain} style={styles.image} />
						) : (
							<Image source={dogMain} style={styles.image} />
						)}
					</>
				) : (
					<Image source={{ uri: imageUri }} style={styles.image} />
				)}

				{/* 고양이 설명 */}
				{breedInfo && (
					<>
						{breedInfo !== 'noInfo' ? (
							<View style={styles.textContainer}>
								<Text style={styles.contentText}>
									- 종류: {breedInfo.breeds?.[0].name}
								</Text>
								{breedInfo.breeds?.[0].alt_names !== undefined && (
									<Text style={styles.contentText}>
										- 별명: {breedInfo.breeds?.[0].alt_names}
									</Text>
								)}
								{breedInfo.breeds?.[0].origin !== undefined && (
									<Text style={styles.contentText}>
										- 출신지: {breedInfo.breeds?.[0].origin}
									</Text>
								)}
								{breedInfo.breeds?.[0].adaptability !== undefined && (
									<Text style={styles.contentText}>
										- 적응력 / 애정도 / 에너지:{' '}
										{breedInfo.breeds?.[0].adaptability} /{' '}
										{breedInfo.breeds?.[0].affection_level} /{' '}
										{breedInfo.breeds?.[0].energy_level}
									</Text>
								)}
								{breedInfo.breeds?.[0].child_friendly !== undefined && (
									<Text style={styles.contentText}>
										- 어린이친화력 / 강아지친화력:{' '}
										{breedInfo.breeds?.[0].child_friendly} /{' '}
										{breedInfo.breeds?.[0].dog_friendly}
									</Text>
								)}
								{breedInfo.breeds?.[0].temperament !== undefined && (
									<Text style={styles.contentText}>
										- 성격: {breedInfo.breeds?.[0].temperament}
									</Text>
								)}
								{breedInfo.breeds?.[0].description !== undefined && (
									<Text style={styles.contentText}>
										- 특징: {breedInfo.breeds?.[0].description}
									</Text>
								)}
							</View>
						) : (
							<View style={styles.textContainer}>
								<Text style={{ textAlign: 'center' }}>
									찾는 정보가 없어요{' '}
									<Emoji name="sob" style={{ fontSize: 20 }} />
								</Text>
							</View>
						)}
					</>
				)}

				{/* 고양이 종 목록 */}
				{breeds && (
					<DropDownPicker
						open={open}
						value={breed || 'random'}
						items={breeds}
						setOpen={setOpen}
						setValue={setBreed}
						setItems={setBreeds}
					/>
				)}

				{/* 찾기 버튼 */}
				<TouchableOpacity onPress={handleButton} style={styles.button}>
					<Text style={styles.buttonText}>
						{whatBook === 'cat' ? '고양이 찾기' : '강아지 찾기'}
					</Text>
				</TouchableOpacity>

				{/* Cat Dog 전환 */}
				<View style={styles.changeBookView}>
					<Text
						style={styles.stackText}
						onClick={() => {
							setStack([])
							setBreedInfo(null)
							setImageUri(whatBook === 'dog' ? dogMain : catMain)
						}}
					>
						검색기록 초기화
					</Text>
					<Text
						style={styles.changeBookText}
						onPress={() => {
							whatBook === 'cat' ? setWhatBook('dog') : setWhatBook('cat')
							setBreed('')
							setImageUri(null)
							setBreedInfo(null)
							setRandomable(false)
						}}
					>
						{whatBook === 'cat' ? '강아지 좋아해?' : '고양이 보러갈래?'}
					</Text>
				</View>

				<View style={styles.stackView}>
					{stack.length > 0 && (
						<div style={styles.stackRow}>
							<Text style={styles.stackTitle}>
								{whatBook === 'cat' ? '찾아본 고양이' : '찾아본 강아지'}
							</Text>
						</div>
					)}
					{stack.map(
						(i, idx) =>
							whatBook === i.animal && (
								<TouchableOpacity
									style={styles.stackFlex}
									key={idx}
									onPress={() => pressStack(idx)}
								>
									<Image source={{ uri: i.url }} style={styles.stackImg} />
									<Text style={styles.stackText}>{i.breeds?.[0]?.name}</Text>
								</TouchableOpacity>
							),
					)}
				</View>
			</View>
			<TouchableOpacity style={styles.footer}>
				<Text
					style={styles.linkText}
					onPress={() => Linking.openURL('https://github.com/imki123')}
				>
					imki123
				</Text>
				<Image source={gitHubIcon} style={styles.githubImg} />
			</TouchableOpacity>
		</ScrollView>
	)
}

export default BreedInfoPage
