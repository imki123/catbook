import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator'
import * as Localization from 'expo-localization'
import { GOOGLE_API_KEY } from './env.js'

//구글번역기
const locale = Localization.locale.substring(0, 2)
console.log("My device's locale:", Localization.locale, '-->', locale)
TranslatorConfiguration.setConfig(ProviderTypes.Google, GOOGLE_API_KEY, locale)
const translator = TranslatorFactory.createTranslator()

const translate = (text) => { //번역할 텍스트를 받아서 promise를 리턴
	return new Promise((resolve, reject) => {
		if (locale != 'en') {
			//영어가 아니면 번역하기
			translator
				.translate(text)
				.then((translated) => {
					resolve(translated)
				})
				.catch((error) => {
					console.log('translate error:', error)
					reject(error)
				})
		} else {
			resolve(text)
		}
	})
}

export default translator
export { translate }
