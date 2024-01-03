import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";

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
            key={index}
            style={styles.movieContainer}
          >
            <Image
              source={{ uri: movie.primaryImage?.url }}
              style={styles.image}
            />
            <Text style={styles.title}>{movie.originalTitleText.text}</Text>
            <Text style={styles.year}>{movie.releaseYear.year}</Text>
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
  movieContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    borderRadius: 8,
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
