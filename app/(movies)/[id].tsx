import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function MovieDetailsById() {
  const params = useLocalSearchParams();
  const apiEndpoint = "https://moviesdatabase.p.rapidapi.com/titles/";
  const [singleMovieDetails, setSingleMovieDetails] = React.useState<any>({});
  const fetchMovieDetails = async (id: string | string[]) => {
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
      });

      const data = await response.json();
      setSingleMovieDetails(data.results);
    } catch (error) {
      console.error("Error fetching movie Details:", error);
    }
  };

  React.useEffect(() => {
    if (params.id) {
      fetchMovieDetails(params.id);
    }
  }, [params.id]);
  console.log("singleMovieDetails", singleMovieDetails.id);
  return (
    <ScrollView>
      {Array.isArray(singleMovieDetails) &&
        singleMovieDetails.map((item, index) => (
          <View>
            <Image
              source={{ uri: item.primaryImage.url }}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text>{item.titleText.text}</Text>
            <Text>{item.releaseYear.year}</Text>
          </View>
        ))}
    </ScrollView>
  );
}
