import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../app/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleButton from "./GoogleButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { app } from "../app/config/firebase";
interface PreviewTypes {
  id: number;
  image: any;
  label: string;
}
//google sign in

const Welcome = () => {
  //routing after authentication
  const router = useRouter();
  //get state of email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //sign in page visibility
  const [isVisible, setVisible] = useState<boolean>(false);
  //sign up page visibility
  const [signUpVisible, setSignUpVisible] = useState<boolean>(false);
  //gets the current user as a side effect
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        console.log("current user is, ", user);
      } else {
        console.log("user needs to log in ");
      }
    });
    return () => unsubscribe();
  }, []);
  //sign up feature (reg email and pass)
  const signUp = async () => {
    try {
      // Check if the email is already in use
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential);
      setSignUpVisible(false);
      router.push("/profileInput");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email is already in use", "Please sign in instead.");
      } else {
        console.error(error);
      }
    }
  };

  //handle successful sign in
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign-in successful:", userCredential);
      goToNextPage();
      setVisible(false);
      router.push("/profileInput");
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        console.error("Invalid email format.");
      } else if (error.code === "auth/user-not-found") {
        console.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        console.error("Incorrect password.");
      } else {
        console.error(error);
      }
    }
  };

  //function to redirect to signup page (closing modals)
  const switchToSignUp = () => {
    setVisible(false);
    setSignUpVisible(true);
  };
  //function to go back from sign up to sign in
  const signUpToSignIn = () => {
    setVisible(true);
    setSignUpVisible(false);
  };

  // loading fonts
  const [fontsLoaded] = useFonts({
    "Inter_24pt-BoldItalic": require("@/assets/fonts/Inter_24pt-BoldItalic.ttf"), // Make sure the path is correct
  });
  //data for the welcome page
  const homePageItems: PreviewTypes[] = [
    { id: 1, image: require("@/assets/images/barber.png"), label: "barber" },
    { id: 2, image: require("@/assets/images/nails.png"), label: "nails" },
    { id: 3, image: require("@/assets/images/eye.png"), label: "lashes" },
  ];

  const goToNextPage = () => {
    setVisible(false);
    router.push("/profileInput");
  };
  //flatlist rendering
  const renderPreviews = ({ item }: { item: PreviewTypes }) => {
    return (
      <View style={styles.previewContent}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.previewText}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logoSize}
          source={require("@/assets/images/stylist.png")}
        />
      </View>
      <View style={styles.mainTextContainer}>
        <Text numberOfLines={3} style={styles.mainText}>
          Find Your Stylists Around The Corner
        </Text>
      </View>
      <View style={styles.previewContainer}>
        <FlatList
          data={homePageItems}
          renderItem={renderPreviews}
          horizontal={true}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", top: 450 }}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal transparent={true} visible={isVisible} animationType="fade">
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View style={styles.modalContainer}>
              <Text style={{ marginLeft: 14, margin: 4 }}>Email</Text>
              <TextInput
                style={styles.textBoxes}
                keyboardType="email-address"
              />
              <Text style={{ marginLeft: 14, margin: 4 }}>Password</Text>
              <TextInput style={styles.textBoxes} secureTextEntry={true} />
              <TouchableOpacity>
                <Text
                  onPress={switchToSignUp}
                  style={{ marginLeft: 10, fontSize: 13 }}
                >
                  Don't have an account?{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  style={{
                    position: "absolute",
                    top: -150,
                    right: 28,
                    width: 25,
                    height: 27,
                  }}
                  source={require("@/assets/images/cross.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  marginLeft: 150,
                  backgroundColor: "black",
                  borderRadius: 8,
                  width: 80,
                  height: 30,
                  alignItems: "center",
                }}
                onPress={handleSignIn}
              >
                <Text
                  style={{
                    padding: 3,
                    fontSize: 20,
                    color: "white",
                    fontFamily: "Inter_24pt-BoldItalic",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal visible={signUpVisible} transparent={true} animationType="fade">
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white",
              marginTop: 200,
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 200,
              borderRadius: 20,
            }}
          >
            <View style={{ marginTop: 40 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginLeft: 10 }}>Email</Text>
                <TextInput
                  style={styles.textBoxes}
                  onChangeText={(newEmail) => setEmail(newEmail)}
                  keyboardType="email-address"
                ></TextInput>
              </View>
              <View>
                <Text style={{ marginLeft: 10 }}>Password</Text>
                <TextInput
                  style={styles.textBoxes}
                  onChangeText={(newPassword) => setPassword(newPassword)}
                  secureTextEntry={true}
                ></TextInput>
                <TouchableOpacity
                  onPress={signUp}
                  style={{ marginLeft: 120, marginTop: 30 }}
                >
                  <Text>Sign Up </Text>
                </TouchableOpacity>
                <GoogleButton></GoogleButton>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={signUpToSignIn}>
                <Text>Back to sign In</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 170,
  },
  logoSize: {
    width: 80,
    height: 80,
  },
  mainTextContainer: {
    top: 200,
  },
  mainText: {
    textAlign: "center",
    top: 50,
    fontSize: 50,
    fontFamily: "Inter_24pt-BoldItalic",
  },
  previewContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 400,
  },
  previewContent: {
    backgroundColor: "white",
    margin: 18,
    width: 110,
    height: 70,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  previewText: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 40,
    height: 50,
  },
  buttonContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter_24pt-BoldItalic",
  },
  modalContainer: {
    justifyContent: "center",
    borderRadius: 40,
    marginLeft: 16,
    marginTop: 260,
    backgroundColor: "white",
    width: 380,
    height: 300,
  },
  textBoxes: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    marginLeft: 10,
    width: 250,
    borderColor: "black",
  },
});
