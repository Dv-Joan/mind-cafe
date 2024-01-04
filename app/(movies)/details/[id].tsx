import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, Chip } from "react-native-paper";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short Film",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

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
  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const randomGenres = shuffleArray(genres).slice(0, 5);

  return (
    <>
      {singleMovieDetails && (
        <ScrollView>
          <ImageBackground
            source={{
              uri:
                singleMovieDetails.primaryImage?.url ||
                "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={{
              width: "100%",
              height: 300,
            }}
          >
            <View className="flex bg-black/50 p-4 flex-row gap-3 items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>

              <Text className="font-bold text-2xl text-white">
                {singleMovieDetails.titleText.text.length > 25
                  ? singleMovieDetails.titleText.text.slice(0, 25) + "..."
                  : singleMovieDetails.titleText.text}
              </Text>
            </View>
          </ImageBackground>

          <View className="space-y-6 p-4 pt-10 bg-[#1E202F] ">
            <View className="flex flex-row gap-2 items-center">
              <Image
                source={{
                  uri:
                    singleMovieDetails.primaryImage?.url ||
                    "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=600",
                }}
                style={{
                  width: "40%",
                  height: 200,
                }}
                className="rounded-2xl "
              />
              <View>
                <Text className="text-white">Release Date</Text>
                <View className="flex flex-col gap-4">
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
                  </View>
                  <Text className="font-bold text-xl text-white w-40 ">
                    {singleMovieDetails.titleText.text}
                  </Text>
                  <Chip
                    icon="calendar"
                    className="rounded-full bg-transparent"
                    onPress={() => console.log("Pressed")}
                  >
                    <Text className="text-white">
                      {singleMovieDetails.releaseDate.year}
                    </Text>
                  </Chip>
                </View>
              </View>
            </View>
            <View className="space-y-2">
              <Text className="font-semibold text-white text-lg">Review</Text>
              <Text className="text-slate-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                sit eligendi fuga sequi similique, cumque nesciunt et, unde
                fugit corporis magnam accusantium dignissimos aspernatur ut
                nobis maiores quidem quasi? Nostrum, praesentium architecto.{" "}
              </Text>
            </View>
            <Button
              className="py-2 rounded-full flex flex-row items-center justify-center gap-2"
              buttonColor="#FF5353"
              onPress={() => router.back()}
            >
              <Ionicons
                style={{
                  transform: [{ rotate: "45deg" }],
                }}
                name="ios-attach-outline"
                className="shadow-lg"
                size={24}
                color="white"
              />
              <Text className="text-white text-lg">Home Page</Text>
            </Button>
            <View>
              <Text className="text-lg text-white">Genres</Text>
              <View className="w-10 h-1 rounded-full bg-rose-500 " />
            </View>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 7,
              }}
            >
              {randomGenres.map((genre, index) => (
                <Chip
                  key={index}
                  // className="bg-transparent border border-slate-400"
                  className="rounded-full "
                >
                  <Text
                  //  className="text-white"
                  >
                    {genre}
                  </Text>
                </Chip>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
