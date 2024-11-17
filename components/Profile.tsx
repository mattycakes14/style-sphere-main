import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Image,
  Touchable,
} from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "expo-router";
import { app } from "../app/config/firebase";
function Profile() {
  //handles stack navigation
  const router = useRouter();
  const logOut = () => {
    router.back();
  };
  //handles state of visibility of modal
  const [visible, setVisible] = useState(true);
  //redirects to stylist page
  const goToStylistPage = () => {
    router.push("/stylistInput");
    setVisible(false);
  };
  //shows an alert when logged out
  const handleLogOut = () => {
    Alert.alert("Logging Out", "Are you sure you want to logout?", [
      { text: "Logout", onPress: signOut },
      {
        text: "cancel",
        onPress: () => console.log("cancel pressed"),
      },
    ]);
  };
  //sign out of user
  const signOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Used signed out successfully");
      logOut();
      // Replace "Login" with the name of your login or welcome screen
    } catch (error) {
      console.log("error occured. Trying signing in again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Modal transparent={true} visible={visible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.typeUserContent}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={goToStylistPage}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("@/assets/images/hairstylist.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.typeUserContent}>
                <TouchableOpacity>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("@/assets/images/working.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleLogOut}>
              <Text>LogOut</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F9F6EE",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 130,
    borderRadius: 30,
  },
  typeUserContent: {
    borderRadius: 10,
    backgroundColor: "#eaf1ef",
    padding: 20,
    margin: 20,
  },
});
