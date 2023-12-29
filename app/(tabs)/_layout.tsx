import { Foundation, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { UserProvider } from "@/context/UserContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Foundation name="home" size={24} color={color} />
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
