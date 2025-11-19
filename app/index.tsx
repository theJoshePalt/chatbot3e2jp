// app/chat.tsx
import React, { useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, } from "react-native";
import RespMessage from "../components/RespMessage";
import WelcomeM from "../components/WelcomeM";

import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chat() {
  // 🧠 Estados del chat
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [pregunta, setPregunta] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 Clave desde .env
  const API_KEY = process.env.EXPO_PUBLIC_CLAV;
  const ai = new GoogleGenerativeAI(API_KEY || "");

  // 🚀 Función para consultar Gemini 2.0 Flash
  const consultarGemini = async () => {
    if (!pregunta.trim()) return;

    // Añadimos el mensaje del usuario
    const nuevoMensaje = { type: "user", text: pregunta };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setPregunta("");
    setIsLoading(true);

    try {
      // Llamada al modelo Gemini 2.0
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              role: "system",
              parts: [
                {
                  text: "Responde sin tanto texto, responde como un amigo y se amable. Usa terminos informales y en español."
                }
              ]
            },
            contents: [
              {
                parts: [
                  { text: nuevoMensaje.text }
                ]
              }
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("📩 Respuesta IA:", data);

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        setMensajes((prev) => [...prev, { type: "ai", text }]);
      } else {
        setMensajes((prev) => [
          ...prev,
          { type: "ai", text: "No se pudo obtener la respuesta." },
        ]);
      }
    } catch (error) {
      console.error("Error al consultar Gemini:", error);
      setMensajes((prev) => [
        ...prev,
        { type: "ai", text: "Error al conectar con la IA." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎨 Interfaz del chat
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#011803]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* CONTENIDO */}
      <View className="flex-1 p-4">
        {mensajes.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <WelcomeM />
          </View>
        ) : (
          <FlatList
            data={mensajes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <RespMessage type={item.type} text={item.text} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        {/* Indicador de carga */}
        {isLoading && (
          <View className="py-4 items-center">
            <ActivityIndicator size="large" color="#16E300" />
            <Text className="text-gray-500 mt-2">Pensando...</Text>
          </View>
        )}
      </View>

      {/* INPUT Y BOTÓN */}
      <View className="w-full px-4 pb-6 bg-transparent">
        <View className="flex-row items-center bg-white rounded-2xl shadow p-2">
          <TextInput
            value={pregunta}
            onChangeText={setPregunta}
            placeholder="Cuéntame algo :v"
            placeholderTextColor="#9CA3AF"
            className="flex-1 px-3 text-gray-700"
            editable={!isLoading}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            className={`ml-2 px-4 py-2 rounded-xl ${
              isLoading ? "bg-[#27F535]" : "bg-[#079C11]"
            }`}
            onPress={consultarGemini}
            disabled={isLoading}
          >
            <Text className="font-semibold text-white">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
