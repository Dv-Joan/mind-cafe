import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Chip, Divider, List, Switch } from "react-native-paper";

export default function Login() {
  const [isSwitch1On, setIsSwitch1On] = React.useState(false);
  const [isSwitch2On, setIsSwitch2On] = React.useState(false);
  return (
    <View className="p-4 space-y-4 bg-white h-screen">
      <View className="flex flex-row justify-end items-start">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="ios-close" size={24} />
        </TouchableOpacity>
      </View>
      <List.Item
        className="bg-blue-100  rounded-3xl p-3"
        style={{
          shadowColor: "#1A6FE0",
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        title={(props) => (
          <Text className=" text-xl font-bold">Emily Blunt</Text>
        )}
        description={(props) => (
          <Text className="text-gray-500 text-sm">
            CEO at <Text className="text-gray-700">Apple Inc</Text>
          </Text>
        )}
        left={(props) => (
          <Image
            source={{
              uri: "https://mighty.tools/mockmind-api/content/human/15.jpg",
            }}
            style={{
              width: 60,
              height: 60,
            }}
            className="rounded-full"
          />
        )}
        right={(props) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(auth)/",
              })
            }
          >
            <Chip className="bg-blue-200/50 mt-5   ">
              <Ionicons name="settings-outline" size={15} color="#1A6FE0" />
              <Text className="text-blue-500  font-bold">Settings</Text>
            </Chip>
          </TouchableOpacity>
        )}
      />
      <List.Item
        className="bg-blue-100/50 shadow-xl rounded-3xl p-3"
        title={(props) => (
          <Text className=" font-bold">The quick brown fox jumps over</Text>
        )}
        description={(props) => (
          <Text className="text-gray-500 text-sm mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            praesentium dolores
          </Text>
        )}
        left={(props) => (
          <View className="bg-blue-200/70 p-2 h-12 rounded-full  flex justify-center items-center">
            <Entypo name="lab-flask" size={30} color="#1A6FE0" />
          </View>
        )}
      />
      <View className="bg-blue-100/50 rounded-3xl shadow-xl p-3">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xs">
            Lorem ipsum dolor sit amet consectetur
          </Text>
          <View className="flex items-center flex-row">
            <Text className="text-xs">{isSwitch1On ? "On" : "Off"}</Text>
            <Switch
              color="#1A6FE0"
              value={isSwitch1On}
              style={{
                transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              }}
              onValueChange={() => setIsSwitch1On(!isSwitch1On)}
            />
          </View>
        </View>
        <Divider className="my-2" />
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xs">
            Lorem ipsum dolor sit amet consectetur
          </Text>
          <View className="flex items-center flex-row">
            <Text className="text-xs">{isSwitch2On ? "On" : "Off"}</Text>

            <Switch
              color="#1A6FE0"
              value={isSwitch2On}
              style={{
                transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              }}
              onValueChange={() => setIsSwitch2On(!isSwitch2On)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
