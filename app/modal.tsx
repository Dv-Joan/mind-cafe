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
  const dialogHandler = () => {
    setVisible((prevVisible: React.SetStateAction<boolean>) => !prevVisible);
  };
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
        <Button mode="contained" className="mt-10" onPress={dialogHandler}>
          Eliminar Cuenta
        </Button>
        <Portal>
          <Dialog
            style={{ borderRadius: 20 }}
            visible={visible}
            onDismiss={dialogHandler}
          >
            <Dialog.Title>Alerta de Seguridad</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Seguro de eliminar tu cuenta</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={dialogHandler}>Aceptar</Button>
              <Button onPress={dialogHandler}>Cerrar</Button>
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
