import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useUserContext } from "../context/UserContext";
import { useUser } from "@/hooks/user-reducer";
type TUser = {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
};

export default function ModalScreen() {
  const { profilePic } = useLocalSearchParams();
  const { deleteUser, users } = useUser();
  const [visible, setVisible] = React.useState(false);
  const dialogHandler = () => {
    setVisible((prevVisible: React.SetStateAction<boolean>) => !prevVisible);
  };
  const handleDeleteUser = () => {
    deleteUser("1");
    dialogHandler();
    router.push({
      pathname: "/(tabs)/form",
    });
  };

  return (
    <>
      {users ? (
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

          <View>
            <Text className="mt-10" style={styles.title}>
              {users.filter((user) => user.id === "1")[0]?.firstName}
              {users.filter((user) => user.id === "1")[0]?.lastName}
            </Text>
            <View style={styles.separator} />
            <View className="flex flex-row my-2">
              <Text>
                <Text style={{ fontWeight: "bold" }}>Email: </Text>
                <Text>{users.filter((user) => user.id === "1")[0]?.email}</Text>
              </Text>
            </View>
          </View>

          <Button mode="contained" className="mt-10" onPress={dialogHandler}>
            Eliminar Cuenta
          </Button>
          <View>
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
                  <Button onPress={handleDeleteUser}>Aceptar</Button>
                  <Button onPress={dialogHandler}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      ) : (
        <View style={styles.container} className="space-y-10">
          <Image
            className="rounded-full "
            source={{
              uri: "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?size=626&ext=jpg&ga=GA1.1.1214943181.1703785948&semt=ais",
            }}
            style={{ width: 200, height: 200 }}
          />
          <Text className="font-bold text-2xl">Usuario no encontrado</Text>
          <Link href="/(tabs)/form">
            <Button mode="contained">Registrar usuario</Button>
          </Link>
        </View>
      )}
    </>
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
