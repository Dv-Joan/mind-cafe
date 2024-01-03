import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  return (
    <View className="p-4">
      <View className="flex flex-row justify-between items-start">
        <Text className="text-xl font-bold">Login</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="ios-close" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
