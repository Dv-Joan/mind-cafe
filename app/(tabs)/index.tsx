import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Drawer,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/context/UserContext";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const User = {
  name: "Brayan Paucar",
  email: "brayan@gmail.com",
  phone: "+51 912 019 251",
  profilePic: "https://mighty.tools/mockmind-api/content/human/5.jpg",
};

export default function TabOneScreen() {
  const [loaded, error] = useFonts({
    Kalnia: require("../../assets/fonts/Kalnia-Regular-Semibold.ttf"),
  });
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);
  const { user } = useUserContext();

  if (!loaded) {
    return null;
  }
  const handlePress = () => {
    router.push({
      pathname: "/(auth)/",
      params: User || user,
    });
  };

  return (
    <ScrollView className="p-5 space-y-5">
      <SafeAreaView className=" space-y-5">
        <View>
          <View className="flex mb-7 flex-row items-start justify-between">
            <Text
              className="text-4xl"
              style={{
                fontFamily: "Kalnia",
              }}
            >
              mind cafe
            </Text>
            <TouchableOpacity
              className="absolute -right-2"
              onPress={handlePress}
            >
              {user ? (
                <Avatar.Image
                  size={30}
                  source={{
                    uri: "https://mighty.tools/mockmind-api/content/human/5.jpg",
                  }}
                />
              ) : (
                // <Avatar.Icon size={30} icon="account" />
                <IconButton
                  icon="logout"
                  iconColor="indigo"
                  mode="contained-tonal"
                  size={20}
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/",
                    })
                  }
                />
              )}
            </TouchableOpacity>
          </View>
          <Text className="text-2xl">
            Relaxed, inspiring essays about happiness
          </Text>
        </View>

        <View className="flex flex-row gap-3  items-center">
          <Button
            icon={"arrow-right"}
            className="w-32"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Follow us
          </Button>
          <Text className="font-semibold">140K Followers</Text>
        </View>
        <Divider />
        <View className="flex flex-row  items-center justify-between">
          <Text className="font-semibold uppercase">Latest</Text>

          <View className="flex flex-row items-center">
            <IconButton
              icon={"view-dashboard-outline"}
              size={20}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon={"format-list-bulleted"}
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
        <View className="space-y-4">
          <View className="flex items-center  flex-row gap-2">
            <Text
              style={{
                fontFamily: "Kalnia",
              }}
            >
              BBC
            </Text>
            <Text className="font-semibold">Julian Basīc</Text>
            <Text className="text-zinc-500">in</Text>
            <Text className="font-semibold">Mind Cafe</Text>
            <Text className="text-zinc-500">• 19 hours ago</Text>
          </View>
          <Text className="text-4xl font-bold">
            4 Hidden Philosphical Gems To Live By
          </Text>
          <Text className="text-xl font-semibold text-zinc-400">
            #3 The Homeless dog philosopher of Ancient Greece and his lessons on
            freedom.
          </Text>

          <Image
            source="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=800"
            style={{ height: 300 }}
            transition={1000}
            placeholder={blurhash}
          />
          <View className="flex items-center  justify-center text-center  flex-row gap-1">
            <Text className="text-zinc-500">Photo by</Text>
            <Link
              href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              asChild
            >
              <Text className="underline text-zinc-500">Alexandra Satiya</Text>
            </Link>
            <Text className="text-zinc-500">on</Text>
            <Link
              href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              asChild
            >
              <Text className="underline text-zinc-500">Unsplash</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
