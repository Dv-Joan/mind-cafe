import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
type TUser = {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
};

export default function ModalScreen() {
  const { name, email, phone, profilePic } = useLocalSearchParams<TUser>();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Image
        className="rounded-full"
        source={{
          uri: Array.isArray(profilePic) ? profilePic[0] : profilePic,
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />

      <Text className="mt-10" style={styles.title}>
        {name}
      </Text>
      <View style={styles.separator} />
      <View className="flex flex-row my-2">
        <Text>
          <Text style={{ fontWeight: "bold" }}>Email: </Text>
          <Text>{email}</Text>
        </Text>
      </View>
      <View className="flex flex-row my-2">
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phone: </Text>
        </Text>
        <Text>{phone} </Text>
      </View>
      <View>
        <Button
          className="bg-indigo-200 mt-10 rounded-full"
          onPress={showDialog}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          Eliminar Cuenta
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alerta de Seguridad</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Seguro de eliminar tu cuenta</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
              <Button onPress={hideDialog}>Cerrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
