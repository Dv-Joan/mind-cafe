import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as React from "react";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = (data: any) => console.log(data);

  return (
    <View className="m-5 ">
      <Text className="text-2xl mb-5 font-bold">Datos requeridos</Text>
      <View
        style={{
          gap: 14,
        }}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Nombres"
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

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Apellidos"
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
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
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          }}
          name="email"
          defaultValue=""
        />
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
                  icon={showPassword ? "eye-off" : "eye"}
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
        onPress={handleSubmit(onSubmit)}
      >
        Registrar
      </Button>
    </View>
  );
}
