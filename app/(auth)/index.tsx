import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Alert,
  Keyboard,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "This field is required " })
    .max(20, { message: "Username must be no more than 20 characters long" })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "Username can only contain alphanumeric characters",
    }),
  email: z.string().email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data: any) => {
    Alert.alert(
      "Welcome",
      `${data.username} is great for us that you begin with Mind Cafe, hope you enjoy it! `,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
    router.push({
      pathname: "/(tabs)",
      params: data,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View className="p-4 bg-[#1E1C2A] pt-16 space-y-6 h-screen relative ">
          <View className="absolute -top-10 left-32 right-0 h-1/5 bg-[#00B661] rounded-2xl shadow-lg shadow-black/50 w-1/5 rotate-[30deg] " />
          <View className="bg-[#1C2F32] rounded-full p-3 w-14 ">
            <Ionicons name="home-outline" size={30} color="#00B661" bg />
          </View>
          <View className=" space-y-2 ">
            <Text className="text-white text-2xl font-bold">
              Let's log you in
            </Text>
            <Text className="text-[#9897A0] text-sm">
              Welcome back, you've been missed!
            </Text>
          </View>
          <View className="flex flex-row  gap-2 pr-4">
            <Button
              className="rounded-xl w-1/2 active:opacity-70 "
              mode="contained"
              buttonColor="#EC4033"
              icon="google-plus"
              onPress={() => Linking.openURL("https://google.com")}
            >
              Google
            </Button>

            <Button
              className="rounded-xl w-1/2 active:opacity-70"
              mode="contained"
              buttonColor="#1876F2"
              icon="facebook"
              onPress={() => Linking.openURL("https://facebook.com")}
            >
              Facebook
            </Button>
          </View>

          <View className="space-y-6">
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="rounded-xl shadow-md  bg-[#24273A]"
                    textColor="white"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Username"
                  />
                )}
                name="username"
                defaultValue=""
              />
              {errors.username && (
                <HelperText type="error">
                  {errors.username.message as any}
                </HelperText>
              )}
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="rounded-xl shadow-md bg-[#24273A] "
                    onBlur={onBlur}
                    textColor="white"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email Adress"
                  />
                )}
                name="email"
                defaultValue=""
              />
              {errors.email && (
                <HelperText type="error">
                  {errors.email.message as any}
                </HelperText>
              )}
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="rounded-xl shadow-md  bg-[#24273A] "
                    onBlur={onBlur}
                    textColor="white"
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        onPress={() => setShowPassword(!showPassword)}
                        icon={showPassword ? "eye" : "eye-off"}
                      />
                    }
                    onChangeText={onChange}
                    value={value}
                    placeholder="Password"
                  />
                )}
                name="password"
                defaultValue=""
              />
              {errors.password && (
                <HelperText type="error">
                  {errors.password.message as any}
                </HelperText>
              )}
            </View>
          </View>
          <Button
            className="rounded-xl active:opacity-70 py-2"
            mode="contained"
            buttonColor="#00B661"
            onPress={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
          <View className="flex flex-row justify-center ">
            <Text className=" text-[#9897A0]">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className=" text-[#1876F2] font-semibold "> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
