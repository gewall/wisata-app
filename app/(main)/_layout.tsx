import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

type Props = {};

const MainLayout = (props: Props) => {
  const color = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: color === "dark" ? "#000" : "#fff",
        },
        headerTintColor: color === "dark" ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="detail/[id]" options={{ title: "Detail Wisata" }} />
    </Stack>
  );
};

export default MainLayout;
