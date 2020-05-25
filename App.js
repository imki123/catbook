import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function App() {
  const [imageUri, setImageUri] = React.useState(null);
  

  const searchCatAsync = () => {
    axios("https://api.thecatapi.com/v1/images/search").then(function (
      response
    ) {
      console.log(response)
      console.log(response.data[0].url);
      setImageUri(response.data[0].url);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catbook</Text>
      {imageUri == null ? 
        <Image source={require("./assets/main.png")} style={styles.logo} /> : 
        <Image source={{ uri: imageUri }} style={styles.logo}/>
      }

      <TouchableOpacity onPress={searchCatAsync} style={styles.button}>
        <Text style={styles.buttonText}>새로운 고양이 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: screenWidth,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
