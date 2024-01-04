import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          presentation: "card",
          title: "Coming Soon",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
