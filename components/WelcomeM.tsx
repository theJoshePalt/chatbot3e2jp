import React from "react";
import { View, Text } from "react-native";
import "@/global.css";
export default function WelcomeM() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold text-[#27F535]">Bienvenido a Bonjour IA</Text>
      <Text className="text-gray-500 mt-2 text-center">
        Escribe primera pregunta bro...
      </Text>
    </View>
  );
}
