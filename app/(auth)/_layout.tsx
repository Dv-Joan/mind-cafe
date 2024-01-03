import React from "react";
import { Link, Stack, router } from "expo-router";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          presentation: "card",
          title: "Login",
          headerRight: () => {
            return (
              <Button
                onPress={() => router.push({ pathname: "/(auth)/signup" })}
                mode="text"
              >
                Sing Up
              </Button>
            );
          },
          headerLeft: () => {
            return (
              <Link href="/(tabs)/" asChild>
                <TouchableOpacity className="flex flex-row -ml-3 items-center">
                  <Ionicons name="ios-chevron-back" size={24} color="indigo" />
                </TouchableOpacity>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
