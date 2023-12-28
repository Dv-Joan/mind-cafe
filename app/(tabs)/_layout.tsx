import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import * as React from "react";
import { Pressable, useColorScheme } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { UserProvider, useUserContext } from "../../context/UserContext";

const user = {
  name: "Brayan Paucar",
  email: "brayan@gmail.com",
  phone: "+51 912 019 251",
  profilePic: "https://mighty.tools/mockmind-api/content/human/5.jpg",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user: User } = useUserContext();
  const handlePress = () => {
    router.push({
      pathname: "/modal",
      params: user,
    });
  };

  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Foundation name="home" size={24} color={color} />
            ),
            headerRight: () => (
              <Pressable onPress={handlePress}>
                {User ? (
                  <Avatar.Image
                    size={30}
                    className="mr-3"
                    source={{
                      uri: "https://mighty.tools/mockmind-api/content/human/5.jpg",
                    }}
                  />
                ) : (
                  <Avatar.Icon size={30} className="mr-3" icon="account" />
                )}
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="form"
          options={{
            title: "Formulario",
            tabBarIcon: ({ color }) => (
              <Ionicons name="newspaper-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
