import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Chip } from "react-native-paper";

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
  return (
    <ScrollView className="p-4 space-y-8">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-2xl">Movie Details</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="ios-close" size={24} />
        </TouchableOpacity>
      </View>

      {singleMovieDetails && (
        <View className="space-y-6 ">
          <View>
            <Text>Movie Title</Text>
            <Text className="text-xl font-bold">
              {singleMovieDetails.titleText.text}
            </Text>
          </View>
          <View className="space-y-1">
            <Text>Release Date</Text>
            <View className="flex flex-row gap-2">
              <Chip
                icon="check"
                className="rounded-full"
                onPress={() => console.log("Pressed")}
              >
                <Text>{singleMovieDetails.releaseDate.day}</Text>
              </Chip>
              <Chip
                icon="calendar"
                mode="outlined"
                className="rounded-full"
                onPress={() => console.log("Pressed")}
              >
                <Text>{singleMovieDetails.releaseDate.month}</Text>
              </Chip>
              <Chip
                icon="calendar"
                className="rounded-full"
                onPress={() => console.log("Pressed")}
              >
                <Text>{singleMovieDetails.releaseDate.year}</Text>
              </Chip>
            </View>
          </View>
          <View className="space-y-2">
            <Text className="font-semibold">Summary</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit
              eligendi fuga sequi similique, cumque nesciunt et, unde fugit
              corporis magnam accusantium dignissimos aspernatur ut nobis
              maiores quidem quasi? Nostrum, praesentium architecto.{" "}
            </Text>
          </View>
          <Image
            className="rounded-xl"
            source={{
              uri:
                singleMovieDetails.primaryImage?.url ||
                "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}
