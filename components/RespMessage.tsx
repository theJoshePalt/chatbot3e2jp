import React from "react";
import { View, Text } from "react-native";
import "@/global.css";
export default function RespMessage({ type, text }: { type: string; text: string }) {
  const isUser = type === "user";
  return (
    <View
      className={`my-2 p-3 rounded-2xl max-w-[80%] ${
        isUser ? "self-end bg-blue-500" : "self-start bg-gray-300"
      }`}
    >
      <Text className={isUser ? "text-white" : "text-black"}>{text}</Text>
    </View>
  );
}
