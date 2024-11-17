import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { db } from "@/app/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Stylist() {
  //stack navigation
  const router = useRouter();
  const goBackFromStylistPage = () => {
    router.back();
  };
  const goToHomePage = () => {
    router.push("/homePage");
  };
  //getting state per input field
  const [service, setService] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [location, setLocation] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const stylistRef = collection(db, "stylistInput");
  //adds the user input to the firestore db
  const addStylistDetails = async () => {
    if (!currentUser) {
      console.log("no user logged in");
      return;
    }

    try {
      await addDoc(stylistRef, {
        service: service,
        location: location,
        priceRange: priceRange,
        userId: currentUser.uid,
      });
      goToHomePage();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 40,
        }}
      >
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <Text>Style Service</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newService) => setService(newService)}
            ></TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text>Price Range</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newPriceRange) =>
                setPriceRange(Number(newPriceRange))
              }
            ></TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newLocation) => setLocation(newLocation)}
            ></TextInput>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <TouchableOpacity
              style={{ backgroundColor: "black", borderRadius: 10 }}
              onPress={goBackFromStylistPage}
            >
              <Text style={{ color: "white", padding: 15 }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: "black", borderRadius: 10 }}
              onPress={addStylistDetails}
            >
              <Text style={{ color: "white", padding: 15 }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Stylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6EE",
  },
  textContainer: {
    paddingTop: 20,
    paddingLeft: 5,
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
  },
});
