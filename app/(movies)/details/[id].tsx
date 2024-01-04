import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MovieDetailsById() {
  const params = useLocalSearchParams();
  const apiEndpoint = "https://moviesdatabase.p.rapidapi.com/titles/";
  const [singleMovieDetails, setSingleMovieDetails] = React.useState<any>();
  const fetchMovieDetails = async (id: any) => {
    const url = `${apiEndpoint}${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "4918df19b1msh132065a0b402c49p1485c2jsne392c9a58dc2",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setSingleMovieDetails(data.results))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching movie Details:", error);
    }
  };
  React.useEffect(() => {
    if (params.id) {
      fetchMovieDetails(params.id);
    }
  }, [params.id]);
  console.log(JSON.stringify(singleMovieDetails, null, 2));
  return (
    <ScrollView className="p-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-2xl">Movie Details</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="ios-close" size={24} />
        </TouchableOpacity>
      </View>

      {singleMovieDetails && (
        <View className="space-y-3 mt-20">
          <Image
            source={{ uri: singleMovieDetails.primaryImage.url }}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Text className="text-2xl font-bold">
            {singleMovieDetails.titleText.text}
          </Text>
          <Text className="text-gray-500">
            {singleMovieDetails.releaseYear.year}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
