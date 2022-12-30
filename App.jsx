import React from 'react'
import { SafeAreaView } from 'react-native'

import BreedInfoPage from './container/BreedInfoPage.jsx'
import { styles } from './styles.js'

console.info('### ENV:', process.env.NODE_ENV)

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <BreedInfoPage />
    </SafeAreaView>
  )
}
