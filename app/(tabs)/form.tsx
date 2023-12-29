import { useUser } from "@/hooks/user-reducer";
import { AntDesign } from "@expo/vector-icons";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Chip,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Form() {
  const [visible, setVisible] = React.useState(false);
  const dialogHandler = () => {
    setVisible((prevVisible: React.SetStateAction<boolean>) => !prevVisible);
  };
  const { users, addUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = (data: TFormData) => {
    setIsLoading(true);
    addUser({
      id: "1",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dialogHandler();
    reset();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView className="m-5 ">
        <Text className="text-2xl mb-5 font-bold">Datos requeridos</Text>
        <View
          style={{
            gap: 14,
            marginBottom: 60,
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Nombres"
                error={!!errors.firstName}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "El campo es requerido",
              },
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            }}
            name="firstName"
            defaultValue=""
          />

          {errors.firstName && (
            <HelperText
              type="error"
              visible={errors.firstName?.type === "required"}
            >
              <AntDesign name="infocirlceo" size={14} color="red" />{" "}
              {errors.firstName?.message}
            </HelperText>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Apellidos"
                error={!!errors.lastName}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "El campo es requerido",
              },
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            }}
            name="lastName"
            defaultValue=""
          />
          {errors.lastName && (
            <HelperText
              type="error"
              visible={errors.lastName?.type === "required"}
            >
              <AntDesign name="infocirlceo" size={14} color="red" />{" "}
              {errors.lastName?.message}
            </HelperText>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                error={!!errors.email}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "El campo es requerido",
              },

              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El campo debe ser un email",
              },
            }}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <HelperText
              type="error"
              visible={
                errors.email?.type === "required" ||
                errors.email?.type === "pattern"
              }
            >
              <AntDesign name="infocirlceo" size={14} color="red" />{" "}
              {errors.email?.message}
            </HelperText>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                mode="outlined"
                onChangeText={onChange}
                value={value}
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? "eye" : "eye-off"}
                  />
                }
              />
            )}
            name="password"
            defaultValue=""
          />
        </View>

        <Button
          mode="contained"
          className="mt-10  rounded-full"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Registrar
        </Button>
        <Portal>
          <Dialog
            style={{ borderRadius: 20 }}
            visible={visible}
            onDismiss={dialogHandler}
          >
            <Dialog.Title>Informacion de Usuario</Dialog.Title>
            <Dialog.Content className="space-y-5">
              <Chip className="text-left ">
                <Text className="font-semibold ">Nombres : </Text>
                <Text> {users[0]?.firstName} </Text>
              </Chip>
              <Chip className="text-left ">
                <Text className="font-semibold ">Apellidos : </Text>
                <Text>{users[0]?.lastName}</Text>
              </Chip>
              <Chip className="text-left ">
                <Text className="font-semibold ">Email : </Text>
                <Text>{users[0]?.email}</Text>
              </Chip>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={dialogHandler}>Aceptar</Button>
              <Button onPress={dialogHandler}>Cerrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
