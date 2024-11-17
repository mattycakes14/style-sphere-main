import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { app } from "../app/config/firebase";
interface Stylist {
  service: string;
  priceRange: number;
  location: string;
}

function SwipeDeck() {
  const stylistDataRef = collection(db, "stylistInput");
  const [stylistData, setStylistData] = useState<Stylist[]>([]);
  useEffect(() => {
    const getStylistData = async () => {
      try {
        const data = await getDocs(stylistDataRef);
        const dataToArray = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStylistData(dataToArray);
      } catch (error) {
        console.log(error);
      }
    };
    getStylistData();
  });
  return (
    <SafeAreaView>
      <Swiper
        cards={stylistData}
        renderCard={(card) => (
          <View>
            <Text>{card.service}</Text>
          </View>
        )}
        cardIndex={0}
      ></Swiper>
    </SafeAreaView>
  );
}

export default SwipeDeck;
