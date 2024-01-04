import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip } from "react-native-paper";

export default function MoviesPage() {
  const [movies, setMovies] = React.useState<any>([]);

  React.useEffect(() => {
    fetch("https://moviesdatabase.p.rapidapi.com/titles/x/upcoming", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4918df19b1msh132065a0b402c49p1485c2jsne392c9a58dc2",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {Array.isArray(movies) &&
        movies.map((movie, index) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: `/(movies)/${movie.id}`,
                params: movie.id,
              });
            }}
            className="mb-10"
            key={index}
          >
            <ImageBackground
              source={{ uri: movie.primaryImage?.url }}
              style={{
                width: "100%",
                height: 600,
              }}
              className="rounded-2xl "
            >
              <View className="bg-black/80 p-5 flex flex-row justify-between bottom-0 w-full absolute">
                <View className="space-y-2">
                  <Text className="font-semibold text-xl w-48 text-white">
                    {movie.originalTitleText.text}
                  </Text>
                  <Text className="text-slate-300 flex flex-row gap-2">
                    <Text>Lanzamiento Esperado: </Text>
                    {movie.releaseDate.day}/{movie.releaseDate.month}/
                    {movie.releaseYear.year}
                  </Text>
                </View>
                <View>
                  <Chip mode="outlined" className="bg-rose-400 ">
                    <Text className="text-white">{movie.titleType.id}</Text>
                  </Chip>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    margin: 16,
  },
  scrollViewContent: {
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  year: {
    fontSize: 14,
    color: "gray",
  },
});
