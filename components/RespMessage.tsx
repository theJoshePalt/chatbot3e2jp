import "@/global.css";
import React from "react";
import { Text, View } from "react-native";
export default function RespMessage({ type, text }: { type: string; text: string }) {
  const isUser = type === "user";
  return (
    <View
      className={`my-2 p-3 rounded-2xl max-w-[80%] ${
        isUser ? "self-end border border-[#046d0b] " : "self-start bg-gray-300"
      }`}
    >
      <Text className={isUser ? "text-white" : "text-black"}>{text}</Text>
    </View>
  );
}
